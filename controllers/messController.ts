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

  async addUser(data: {"users" : number[], "chatId" : number}){
    try {
      return await this.api.addUser(data);

    } catch (e: any) {
      console.error(e.message);
    }
  }

  async removeUser(data: {"users" : number[], "chatId" : number}){
    try {
      return await this.api.removeUser(data);

    } catch (e: any) {
      console.error(e.message);
    }
  }

  async deleteChat(data: {"chatId" : number}){
    try {
      return await this.api.deletecChat(data);

    } catch (e: any) {
      console.error(e.message);
    }
  }

  async setAvatar(data: FormData){
    try {
      return await this.api.setAvatar(data);

    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new MessController();
