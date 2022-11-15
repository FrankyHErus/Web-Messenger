import API, { ChatAPI } from '../api/chatApi';

export class MessController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  async read(){
    try {

      const chatList = await this.api.read();
      return chatList;

    } catch (e: any) {
      console.error(e);
    }
  }

  async createChat(data: {title : string}){
    try {
      return await this.api.createChat(data);

    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new MessController();