import API, { SettAPI, UserPassword, UserProfile } from '../api/settApi';

export class SettController {
  private readonly api: SettAPI;

  constructor() {
    this.api = API;
  }

  async changeProfile(data: UserProfile) {
    try {
      await this.api.changeProfile(data);
    } catch (e: any) {
      console.error(e);
    }
  }

  async changePassword(data: UserPassword) {
    try {
      await this.api.changePassword(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async changeAvatar(data: FormData) {
    try {
      await this.api.changeAvatar(data);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new SettController();
