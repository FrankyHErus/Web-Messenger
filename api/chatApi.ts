import BaseAPI from './baseApi';

export interface Chat{
    id: number,
    "title": string,
    "avatar": string,
    "unread_count": number,
    "last_message": {
      "user": {
        "first_name": string,
        "second_name": string,
        "avatar": string,
        "email": string,
        "login": string,
        "phone": string
      },
      "time": string,
      "content": string
    }
}

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  read(): Promise<Array<Chat>>{
    return this.http.get('/');
  }

  createChat(data: {title : string}) {
    return this.http.post('', data);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new ChatAPI();