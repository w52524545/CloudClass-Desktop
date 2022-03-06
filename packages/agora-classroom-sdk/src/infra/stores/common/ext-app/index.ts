import { computed, reaction, toJS } from 'mobx';
import { AgoraRteEngineConfig, bound, Lodash, Log, RteLanguage } from 'agora-rte-sdk';
import { EduUIStoreBase } from '../base';
import { dependencies } from './dependencies';
import {
  EduClassroomConfig,
  EduRoleTypeEnum,
  escapeExtAppIdentifier,
  IAgoraExtApp,
} from 'agora-edu-core';

const languageMap = { [RteLanguage.zh]: 'zh', [RteLanguage.en]: 'en' };

@Log.attach({ proxyMethods: false })
export class ExtAppUIStore extends EduUIStoreBase {
  /** Getters  */
  /**
   * 当前用户是否拥有 ExtApp 的关闭权限
   * @returns
   */
  get canClose() {
    const { userRole, userUuid } = this.classroomStore.roomStore;
    const { grantUsers } = this.classroomStore.boardStore;

    return userRole === EduRoleTypeEnum.teacher || grantUsers.has(userUuid);
  }

  /**
   * 当前用户是否拥有 ExtApp 的移动权限
   * @returns
   */
  get canDrag() {
    const { userRole, userUuid } = this.classroomStore.roomStore;
    const { grantUsers } = this.classroomStore.boardStore;

    return userRole === EduRoleTypeEnum.teacher || grantUsers.has(userUuid);
  }

  /**
   * 当前打开的 ExtApp
   * @returns
   */
  @computed
  get activeApps() {
    const { extApps } = this.classroomStore.extAppStore;

    return Object.values(extApps).filter(this.isActive);
  }

  /**
   * 更新 ExtApp 属性
   * @param appId
   * @returns
   */
  @bound
  private handleUpdate(appId: string) {
    const { updateExtAppProperties } = this.classroomStore.extAppStore;
    return async (properties: any, common: any, cause: any) =>
      await updateExtAppProperties(appId, properties, common, cause);
  }

  /**
   * 移除 ExtApp 属性
   * @param appId
   * @returns
   */
  @bound
  private handleDelete(appId: string) {
    const { deleteExtAppProperties } = this.classroomStore.extAppStore;
    return async (properties: string[], cause: any) => {
      return await deleteExtAppProperties(appId, properties, cause);
    };
  }

  /**
   * 关闭 ExtApp
   * @param appId
   */
  @bound
  shutdownApp(appId: string) {
    this.classroomStore.extAppStore.shutdownApp(appId);
  }

  /**
   * 启动 ExtApp
   * @param appId
   */
  @bound
  launchApp(appId: string) {
    this.classroomStore.extAppStore.launchApp(appId);
  }

  /**
   * 挂载 ExtApp 到 DOM
   * @param dom
   * @param extApp
   */
  @bound
  mount(dom: HTMLElement | null, extApp: IAgoraExtApp) {
    if (dom) {
      const { roomUuid, roomType, roomName, extAppProperties } = this.classroomStore.roomStore;

      const language = languageMap[AgoraRteEngineConfig.shared.language];

      const properties = toJS(extAppProperties[escapeExtAppIdentifier(extApp.appIdentifier)]) || {};

      const { userUuid, role, userName } = EduClassroomConfig.shared.sessionInfo;

      const context = {
        language,
        properties,
        dependencies,
        localUserInfo: {
          userUuid,
          userName,
          roleType: role,
        },
        roomInfo: {
          roomName,
          roomUuid,
          roomType,
        },
      };

      const handlers = {
        updateRoomProperties: this.handleUpdate(extApp.appIdentifier),
        deleteRoomProperties: this.handleDelete(extApp.appIdentifier),
      };

      extApp.extAppDidLoad(dom, context, handlers);
    } else {
      const rollback = () => {
        this.launchApp(extApp.appIdentifier);
      };
      this.shutdownApp(extApp.appIdentifier);
      extApp.extAppWillUnload().catch(rollback);
    }
  }

  /**
   * 更新 ExtApp 的轨迹信息
   * @param appId
   * @param width
   * @param height
   */
  @Lodash.debounced(200, { trailing: true })
  updateTrackState(appId: string, width: number, height: number) {
    this.classroomStore.extAppsTrackStore.setTrackLocalDimensionsById(
      escapeExtAppIdentifier(appId),
      {
        width,
        height,
        real: true,
      },
    );
  }

  /**
   * ExtApp 是否已启动
   * @param extApp
   * @returns
   */
  @bound
  private isActive(extApp: IAgoraExtApp) {
    const { extAppsCommon, extAppProperties, userRole } = this.classroomStore.roomStore;
    const { activeAppIds } = this.classroomStore.extAppStore;

    if (userRole === EduRoleTypeEnum.assistant) {
      return false;
    }

    const localActive = activeAppIds.includes(extApp.appIdentifier);

    const state = extAppProperties[escapeExtAppIdentifier(extApp.appIdentifier)] || {};

    const extAppCommon = extAppsCommon[escapeExtAppIdentifier(extApp.appIdentifier)];

    const remoteActive = extAppCommon && extAppCommon.state === 1;

    if (extApp.appIdentifier === 'io.agora.countdown') {
      if (userRole === EduRoleTypeEnum.teacher) {
        return localActive || remoteActive;
      }
      // student
      return remoteActive && state.state === '1';
    }

    return localActive || remoteActive;
  }

  /**
   * ExtApp 事件通知
   */
  @bound
  private fireEvent() {
    this.activeApps.forEach((extApp) => {
      const studentKeys = this.classroomStore.userStore.studentList.keys();

      if (extApp.eventHandler && extApp.eventHandler.onUserListChanged) {
        const userList = Array.from(studentKeys).map((key) => {
          const { userName, userUuid, userRole } =
            this.classroomStore.userStore.studentList.get(key)!;

          return {
            userName,
            userUuid,
            roleType: userRole,
          };
        });

        extApp.eventHandler.onUserListChanged(userList);
      }
    });
  }

  onInstall() {
    reaction(() => this.classroomStore.userStore.studentList.keys(), this.fireEvent);

    reaction(() => this.activeApps.keys(), this.fireEvent);
  }

  onDestroy() {}
}