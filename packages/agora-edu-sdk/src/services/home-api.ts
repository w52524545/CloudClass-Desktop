import { ApiBase, ApiBaseInitializerParams } from './base';

type LoginParams = {
  roomUuid: string
  rtmUid: string
  role: string
}

type LoginResult = Promise<{
  rtmToken: string,
  userUuid: string
}>

export class HomeApi extends ApiBase {
  constructor(params: ApiBaseInitializerParams) {
    super(params)
    this.prefix = `${this.sdkDomain}/edu`.replace('%app_id%', this.appId)
  }

  async login(userUuid: string): LoginResult {
    const res = await this.fetch({
      url: `/v2/users/${userUuid}/token`,
      method: 'GET',
    })
    return res.data
  }
}

export const homeApi = new HomeApi({
  sdkDomain: ``,
  appId: ``,
  rtmToken: '',
  rtmUid: ''
})