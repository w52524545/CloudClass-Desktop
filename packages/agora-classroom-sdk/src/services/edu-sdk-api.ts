import { ApiBase, ApiBaseInitializerParams } from "./base";
import { HttpClient } from "@/modules/utils/http-client";
import { reportService } from "./report-service";

type ConfigResult = {
  customerId: string,
  customerCertificate: string,
  netless: {
    appId: string
    token: string,
    oss: {
      region: string,
      bucket: string,
      folder: string,
      accessKey: string,
      secretKey: string,
      endpoint: string
    }
  },
  recordUrl: string
}

type ConfigParams = Pick<ApiBaseInitializerParams, 'sdkDomain' | 'appId'>

export class EduSDKApi extends ApiBase {

  constructor(params: ApiBaseInitializerParams) {
    super(params)
    this.prefix = `${this.sdkDomain}/edu/apps/%app_id`.replace("%app_id", this.appId)
  }

  updateConfig(params: ConfigParams) {
    this.appId = params.appId
    this.sdkDomain = params.sdkDomain
    this.prefix = `${this.sdkDomain}/edu/apps/%app_id`.replace("%app_id", this.appId)
  }

  updateRtmInfo(info: {
    rtmToken: string, rtmUid: string
  }) {
    this.rtmToken = info.rtmToken
    this.rtmUid = info.rtmUid
  }

  async getConfig(): Promise<ConfigResult> {
    const res = await this.fetch({
      url: `/v2/configs`,
      method: 'GET',
    })
    return res.data
  }

  async reportCameraState(payload: {roomUuid: string, userUuid: string, state: number}): Promise<any> {
    const res = await this.fetch({
      url: `/v2/rooms/${payload.roomUuid}/users/${payload.userUuid}/device`,
      method: 'PUT',
      data: {
        camera: payload.state
      }
    })
    return res.data
  }

  async checkIn(params: {
    roomUuid: string,
    roomName: string,
    roomType: number,
    userName: string,
    userUuid: string,
    role: number,
    startTime?: number,
    duration?: number,
  }) {
    // REPORT
    reportService.startTick('joinRoom', 'http', 'preflight')
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/users/${params.userUuid}`,
      method: 'PUT',
      data: {
        roomName: params.roomName,
        roomType: params.roomType,
        role: params.role,
        startTime: params.startTime,
        userName: params.userName,
        duration: params.duration,
      }
    })
    res.data.ts = res.ts
    const statusCode = res['__status']
    const {code} = res
    reportService.reportHttp('joinRoom', 'http', 'preflight', statusCode, statusCode === 200, code)
    return res.data
  }

  async updateClassState(params: {
    roomUuid: string,
    state: number
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/states/${params.state}`,
      method: 'PUT'
    })
    return res.data
  }

  async updateRecordingState(params: {
    roomUuid: string,
    state: number,
    url?: string,
  }) {
    // todo 调服务器，url为方法传入对象的key url
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/records/states/${params.state}`,
      method: 'PUT',
      data: {
        url: params.url
      }
    })
    return res.data
  }
  
  async getHistoryChatMessage(params: {
    roomUuid: string,
    userUuid: string,
    data: {
      nextId: string,
      sort: number
    }
  }){
    const { data: { nextId, sort } } = params
    const isNextId = nextId ? `nextId=${nextId}&` : ''
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/chat/messages?${isNextId}sort=${sort}`,
      method: 'GET',
    })
    return res.data
  }

  async sendChat(params: {
    roomUuid: string,
    userUuid: string,
    data: {
      message: string,
      type: number
    }
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/from/${params.userUuid}/chat`,
      method: 'POST',
      data: params.data
    })
    return res.data
  }

  async muteChat(params: {
    roomUuid: string,
    muteChat: number
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/mute`,
      method: 'PUT',
      data: {
        muteChat: params.muteChat
      }
    })
    return res.data
  }

  // acadsoc
  async translateChat(params: {
    content: string,
    from?: string,
    to?: string,
  }) {
    const res = await this.fetch({
      full_url: `${this.sdkDomain}/edu/acadsoc/apps/${this.appId}/v1/translation`,
      method: 'POST',
      data: {
        content: params.content,
        from: params.from ? params.from : 'auto',
        to: params.to ? params.to : 'auto',
      }
    })
    return res.data
  }

  async sendRewards(params: {
    roomUuid: string,
    rewards: Array<{
      userUuid: string,
      changeReward: number,
    }>,
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/rewards`,
      method: 'POST',
      data: {
        rewardDetails: params.rewards,
      }
    })
    return res.data
  }

  async handsUp(params: {
    roomUuid: string,
    toUserUuid: string,
    payload: any
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/handup/${params.toUserUuid}`,
      method: 'POST',
      data: {
        payload: JSON.stringify({
          cmd: 1,
          data: params.payload
        })
      }
    })
    return res.data
  }

  async allowHandsUp(params: {
    roomUuid: string,
    state: string,
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/processes/handsUp/${params.state}`,
      method: 'PUT',
    })
    return res.data
  }

  async startHandsUp(params: {
    roomUuid: string,
    toUserUuid: string,
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/processes/handsUp/progress`,
      method: 'POST',
      data: {
        toUserUuid: params.toUserUuid,
      }
    })
    return res.data
  }

  async dismissHandsUp(params: {
    roomUuid: string,
    toUserUuid: string,
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/processes/handsUp/acceptance`,
      method: 'DELETE',
    })
    return res.data
  }

  async cancelHandsUp(params: {
    roomUuid: string,
    toUserUuid: string,
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/processes/handsUp/progress`,
      method: 'DELETE',
      data: {
        toUserUuid: params.toUserUuid,
      }
    })
    return res.data
  }

  async acceptHandsUp(params: {
    roomUuid: string,
    toUserUuid: string,
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/processes/handsUp/acceptance`,
      method: 'POST',
      data: {
        toUserUuid: params.toUserUuid,
      }
    })
    return res.data
  }

  async refuseHandsUp(params: {
    roomUuid: string,
    toUserUuid: string,
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/processes/handsUp/progress`,
      method: 'DELETE',
      data: {
        toUserUuid: params.toUserUuid,
      }
    })
    return res.data
  }

  async revokeCoVideo(params: {
    roomUuid: string,
    toUserUuid: string,
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/processes/handsUp/acceptance`,
      method: 'DELETE',
      data: {
        toUserUuid: params.toUserUuid,
      }
    })
    return res.data
  }

  async kick(params: {
    roomUuid: string,
    toUserUuid: string,
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/users/${params.toUserUuid}/exit`,
      method: 'POST',
      data: {
        dirty: {
          state: 1,
          duration: 600,
        }
      }
    })
    return res.data
  }

}

export const eduSDKApi = new EduSDKApi({
  sdkDomain: '',
  appId: '',
  rtmToken: '',
  rtmUid: ''
})