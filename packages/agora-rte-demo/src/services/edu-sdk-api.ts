import { ApiBase, ApiBaseInitializerParams } from "./base";
import { HttpClient } from "@/modules/utils/http-client";

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
  }
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

  async checkIn(params: {
    roomUuid: string,
    roomName: string,
    roomType: number,
    userUuid: string,
    role: number,
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/users/${params.userUuid}`,
      method: 'PUT',
      data: {
        roomName: params.roomName,
        roomType: params.roomType,
        role: params.role
      }
    })

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
    state: number
  }) {
    const res = await this.fetch({
      url: `/v2/rooms/${params.roomUuid}/records/states/${params.state}`,
      method: 'PUT'
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
}

export const eduSDKApi = new EduSDKApi({
  sdkDomain: '',
  appId: '',
  rtmToken: '',
  rtmUid: ''
})