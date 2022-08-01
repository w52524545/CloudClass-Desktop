import { request } from '@/infra/utils/request';

export class HomeApi {
  static shared = new HomeApi();
  domain = '';

  async loginV3(
    userUuid: string,
    roomUuid: string,
    role: number,
  ): Promise<{
    appId: string;
    roomUuid: string;
    userUuid: string;
    role: number;
    token: string;
  }> {
    const { data } = await request.get(
      `${this.domain}/edu/v3/rooms/${roomUuid}/roles/${role}/users/${userUuid}/token`,
    );
    return data.data;
  }

  async login(
    userUuid: string,
    roomUuid: string,
    role: number,
  ): Promise<{
    appId: string;
    roomUuid: string;
    userUuid: string;
    role: number;
    token: string;
  }> {
    const { data } = await request.get(
      `${this.domain}/edu/v4/rooms/${roomUuid}/roles/${role}/users/${userUuid}/token`,
    );
    return data.data;
  }

  async getRecordations(roomUuid: string): Promise<any> {
    const { data } = await request.get(`${this.domain}/edu/v2/rooms/${roomUuid}/records`);
    return data.data;
  }

  async getBuilderResource(companyId: string, projectId: string): Promise<any> {
    const { data } = await request.get(
      `${this.domain}/builder/companys/${companyId}/v1/projects/${projectId}/preview`,
    );

    return data;
  }
}