import BaseAPI from './baseApi';

export interface UserProfile{
    first_name: string,
    second_name: string,
    display_name: string,
    login: string,
    email: string,
    phone: string
}

export interface UserPassword{
    oldPassword: string,
    newPassword: string
}

export class SettAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  changeProfile(data: UserProfile){
    return this.http.put('/profile', data);
  }

  changePassword(data: UserPassword){
    return this.http.put('/password', data);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new SettAPI();