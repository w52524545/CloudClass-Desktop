import { observable, action, computed, when } from 'mobx';
import {
  AgoraComponentRegion,
  AgoraRteEngine,
  AgoraRteEventType,
  AgoraRteScene,
  AgoraRteSceneJoinRTCOptions,
  AGRtcConnectionType,
  bound,
  Log,
  RtcState,
} from 'agora-rte-sdk';
import { AgoraEduClassroomEvent, ClassroomState, WhiteboardState } from '../../../type';
import { EduClassroomConfig } from '../../../configs';
import { EduRole2RteRole } from '../../../utils';
import { EduStoreBase } from './base';
import { AGEduErrorCode, EduErrorCenter } from '../../../utils/error';
import { retryAttempt } from 'agora-rte-sdk';
import to from 'await-to-js';
import { RoomPhase } from 'white-web-sdk';
import { ClassroomSchedule } from './room/type';
import { EduEventCenter } from '../../../event-center';
import { AgoraRteConnectionState } from 'agora-rte-sdk';

export type CheckInData = {
  vid: number;
  clientServerTime: number;
  classRoomSchedule: ClassroomSchedule;
  rtcRegion: AgoraComponentRegion;
  rtmRegion: AgoraComponentRegion;
};

export enum LeaveReason {
  leave,
  kickOut,
}

export enum SceneType {
  Main,
  Sub,
}

@Log.attach({ proxyMethods: false })
export class ConnectionStore extends EduStoreBase {
  // observerbles
  @observable classroomState: ClassroomState = ClassroomState.Idle;
  @observable classroomStateErrorReason?: string;
  @observable whiteboardState: WhiteboardState = WhiteboardState.Idle;
  @observable rtcState: RtcState = RtcState.Idle;
  @observable rtcSubState: RtcState = RtcState.Idle;
  @observable _mainRoomScene?: AgoraRteScene;
  @observable _subRoomScene?: AgoraRteScene;
  @observable engine?: AgoraRteEngine;
  @observable checkInData?: CheckInData;

  @computed
  get scene() {
    if (this._subRoomScene) {
      return this._subRoomScene;
    }
    return this._mainRoomScene;
  }

  get sceneId() {
    return this.scene!.sceneId;
  }

  @computed
  get mainRoomScene() {
    return this._mainRoomScene;
  }

  @computed
  get subRoomScene() {
    return this._subRoomScene;
  }

  // actions
  @action.bound
  setClassroomState(state: ClassroomState, reason?: string) {
    if (this.classroomState !== state) {
      this.logger.info(`classroom state changed to ${state} ${reason}`);
      if (state === ClassroomState.Error) {
        this.classroomStateErrorReason = reason;
      }
      this.classroomState = state;
    }
  }

  @action.bound
  setWhiteboardState(state: RoomPhase) {
    this.logger.debug(`whiteboard state changed to ${state}`);
    switch (state) {
      case RoomPhase.Connected:
        this.whiteboardState = WhiteboardState.Connected;
        break;
      case RoomPhase.Connecting:
        this.whiteboardState = WhiteboardState.Connecting;
        break;
      case RoomPhase.Reconnecting:
        this.whiteboardState = WhiteboardState.Reconnecting;
        break;
      case RoomPhase.Disconnected:
        this.whiteboardState = WhiteboardState.Idle;
        break;
      case RoomPhase.Disconnecting:
        this.whiteboardState = WhiteboardState.Disconnecting;
        break;
    }
  }

  @action.bound
  setRtcState(state: RtcState, connectionType?: AGRtcConnectionType) {
    let connType = connectionType ? connectionType : AGRtcConnectionType.main;
    this.logger.debug(`${connectionType}] rtc state changed to ${state}`);
    connType === AGRtcConnectionType.main ? (this.rtcState = state) : (this.rtcSubState = state);
  }

  @action
  setScene(sceneType: SceneType, scene?: AgoraRteScene) {
    if (sceneType === SceneType.Main) {
      this._mainRoomScene = scene;
    } else {
      this._subRoomScene = scene;
    }
  }

  @action
  setCheckInData(checkInData: CheckInData) {
    this.checkInData = checkInData;
  }

  @action.bound
  initialize() {
    const ignoreUrlRegionPrefix = EduClassroomConfig.shared.rteEngineConfig.ignoreUrlRegionPrefix;
    this.classroomStore.api.pathPrefix = `${
      ignoreUrlRegionPrefix
        ? ''
        : '/' + EduClassroomConfig.shared.rteEngineConfig.region.toLowerCase()
    }/edu/apps/${EduClassroomConfig.shared.appId}`;
    this.classroomStore.api.headers = EduClassroomConfig.shared.headers;
    this.engine = AgoraRteEngine.createWithConfig(EduClassroomConfig.shared.rteEngineConfig);
  }

  // computed

  // others
  getEngine(): AgoraRteEngine {
    if (!this.engine) {
      return EduErrorCenter.shared.handleThrowableError(
        AGEduErrorCode.EDU_ERR_RTE_ENGINE_NOT_READY,
        new Error(`engine not initialized, call initialize first`),
      );
    }
    return this.engine;
  }

  @action.bound
  async joinClassroom() {
    let engine = this.getEngine();

    if (this.classroomState !== ClassroomState.Idle) {
      return EduErrorCenter.shared.handleThrowableError(
        AGEduErrorCode.EDU_ERR_INVALID_JOIN_CLASSROOM_STATE,
        new Error(`invalid join classroom state: ${this.classroomState}`),
      );
    }

    let [error] = await to(
      retryAttempt(async () => {
        this.setClassroomState(ClassroomState.Connecting);
        const { sessionInfo } = EduClassroomConfig.shared;
        const { data, ts } = await this.classroomStore.api.checkIn(sessionInfo);
        const { state = 0, startTime, duration, closeDelay = 0, rtcRegion, rtmRegion, vid } = data;
        this.setCheckInData({
          vid,
          clientServerTime: ts,
          classRoomSchedule: {
            state,
            startTime,
            duration,
            closeDelay,
          },
          rtcRegion,
          rtmRegion,
        });

        await engine.login(sessionInfo.token, sessionInfo.userUuid);
        const scene = engine.createAgoraRteScene(sessionInfo.roomUuid);

        //listen to rte state change
        scene.on(
          AgoraRteEventType.RteConnectionStateChanged,
          (state: AgoraRteConnectionState, reason?: string) => {
            this.setClassroomState(this._getClassroomState(state), reason);
          },
        );

        //listen to rtc state change
        scene.on(AgoraRteEventType.RtcConnectionStateChanged, (state, connectionType) => {
          this.setRtcState(state, connectionType);
        });

        this.setScene(SceneType.Main, scene);
        // streamId defaults to 0 means server allocate streamId for you
        await scene.joinScene({
          userName: sessionInfo.userName,
          userRole: EduRole2RteRole(sessionInfo.roomType, sessionInfo.role),
          streamId: '0',
        });
      }, [])
        .fail(({ error }: { error: Error }) => {
          this.setScene(SceneType.Main, undefined);
          this.logger.error(error.message);
          return true;
        })
        .abort(() => {
          this.setScene(SceneType.Main, undefined);
        })
        .exec(),
    );

    if (error) {
      this.setClassroomState(ClassroomState.Idle);
      return EduErrorCenter.shared.handleThrowableError(
        AGEduErrorCode.EDU_ERR_JOIN_CLASSROOM_FAIL,
        error,
      );
    }

    this.setClassroomState(ClassroomState.Connected);
    EduEventCenter.shared.emitClasroomEvents(AgoraEduClassroomEvent.Ready);
  }

  @action.bound
  async joinSubRoom(roomUuid: string) {
    if (this.classroomState !== ClassroomState.Connected) {
      return EduErrorCenter.shared.handleThrowableError(
        AGEduErrorCode.EDU_ERR_GROUP_CANNOT_JOIN,
        new Error(`cannot join group while classroom not connected`),
      );
    }

    let [error] = await to(
      retryAttempt(async () => {
        const { sessionInfo: baseSessionInfo } = EduClassroomConfig.shared;
        const sessionInfo = { ...baseSessionInfo, baseSessionInfo, roomUuid };
        const { data, ts } = await this.classroomStore.api.checkIn(sessionInfo);
        const { state = 0, startTime, duration, closeDelay = 0, rtcRegion, rtmRegion, vid } = data;
        this.setCheckInData({
          vid,
          clientServerTime: ts,
          classRoomSchedule: {
            state,
            startTime,
            duration,
            closeDelay,
          },
          rtcRegion,
          rtmRegion,
        });

        const engine = this.getEngine();
        const scene = engine.createAgoraRteScene(sessionInfo.roomUuid);

        this.setScene(SceneType.Sub, scene);
        // streamId defaults to 0 means server allocate streamId for you
        await scene.joinScene({
          userName: sessionInfo.userName,
          userRole: EduRole2RteRole(sessionInfo.roomType, sessionInfo.role),
          streamId: '0',
        });
      }, [])
        .fail(({ error }: { error: Error }) => {
          this.setScene(SceneType.Sub, undefined);
          this.logger.error(error.message);
          return true;
        })
        .abort(() => {
          this.setScene(SceneType.Sub, undefined);
        })
        .exec(),
    );

    if (error) {
      return EduErrorCenter.shared.handleThrowableError(
        AGEduErrorCode.EDU_ERR_JOIN_CLASSROOM_FAIL,
        error,
      );
    }
  }

  @action.bound
  async leaveSubRoom() {
    if (this.scene) {
      await this.scene.leaveRTC();
      await this.scene.leaveScene();
      this.setScene(SceneType.Sub, undefined);
    }
  }

  @bound
  async leaveClassroom(reason: LeaveReason) {
    await this.leaveClassroomUntil(reason, Promise.resolve());
  }

  @bound
  async leaveClassroomUntil(reason: LeaveReason, promise: Promise<void>) {
    let [err] = await to(this.leaveWhiteboard());
    err &&
      EduErrorCenter.shared.handleNonThrowableError(
        AGEduErrorCode.EDU_ERR_LEAVE_CLASSROOM_FAIL,
        err,
      );
    [err] = await to(this.leaveRTC());
    err &&
      EduErrorCenter.shared.handleNonThrowableError(
        AGEduErrorCode.EDU_ERR_LEAVE_CLASSROOM_FAIL,
        err,
      );
    [err] = await to(this.scene?.leaveScene() || Promise.resolve());
    err &&
      EduErrorCenter.shared.handleNonThrowableError(
        AGEduErrorCode.EDU_ERR_LEAVE_CLASSROOM_FAIL,
        err,
      );
    AgoraRteEngine.destroy();
    this.setClassroomState(ClassroomState.Idle);

    promise.then(() =>
      EduEventCenter.shared.emitClasroomEvents(AgoraEduClassroomEvent.Destroyed, reason),
    );
  }

  @bound
  async joinRTC(options?: AgoraRteSceneJoinRTCOptions) {
    //join rtc
    let [err] = await to(this.scene?.joinRTC(options) || Promise.resolve());
    err && EduErrorCenter.shared.handleThrowableError(AGEduErrorCode.EDU_ERR_JOIN_RTC_FAIL, err);
  }

  @bound
  async leaveRTC(connectionType?: AGRtcConnectionType) {
    //leave rtc
    let [err] = await to(this.scene?.leaveRTC(connectionType) || Promise.resolve());
    err &&
      EduErrorCenter.shared.handleNonThrowableError(AGEduErrorCode.EDU_ERR_LEAVE_RTC_FAIL, err);
  }

  @bound
  async joinWhiteboard() {
    if (this.whiteboardState !== WhiteboardState.Idle) {
      return EduErrorCenter.shared.handleThrowableError(
        AGEduErrorCode.EDU_ERR_INVALID_JOIN_WHITEBOARD_STATE,
        new Error(`invalid join whiteboard state: ${this.whiteboardState}`),
      );
    }

    //join whiteboard
    let [err] = await to(
      this.classroomStore.boardStore.joinBoard(EduClassroomConfig.shared.sessionInfo.role),
    );
    err &&
      EduErrorCenter.shared.handleThrowableError(
        AGEduErrorCode.EDU_ERR_CONN_JOIN_WHITEBOARD_FAIL,
        err,
      );
  }

  @bound
  async leaveWhiteboard() {
    //leave whiteboard
    let [err] = await to(this.classroomStore.boardStore.leaveBoard());
    err &&
      EduErrorCenter.shared.handleNonThrowableError(
        AGEduErrorCode.EDU_ERR_CONN_LEAVE_WHITEBOARD_FAIL,
        err,
      );
  }

  getRtcState(connectionType: AGRtcConnectionType) {
    return connectionType === AGRtcConnectionType.main ? this.rtcState : this.rtcSubState;
  }

  private _getClassroomState(state: AgoraRteConnectionState): ClassroomState {
    switch (state) {
      case AgoraRteConnectionState.Idle:
        return ClassroomState.Idle;
      case AgoraRteConnectionState.Connecting:
        return ClassroomState.Connecting;
      case AgoraRteConnectionState.Connected:
        return ClassroomState.Connected;
      case AgoraRteConnectionState.Reconnecting:
        return ClassroomState.Reconnecting;
      case AgoraRteConnectionState.Error:
        return ClassroomState.Error;
    }
  }

  onInstall() {}
  onDestroy() {}
}
