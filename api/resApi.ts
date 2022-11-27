import BaseAPI from './baseApi';

export class ResAPI extends BaseAPI {
  constructor() {
    super('');
  }

  getAvatar(data: string) : Promise<any>{
    return this.http.get("/resources/" + data);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new ResAPI();
