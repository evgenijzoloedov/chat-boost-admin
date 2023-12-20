import {api} from "./axios";
import {Message} from "../types/message";

class DialogsService{

  private url = 'admin/dialogues'

  async getAllDialogs(){
    return api.get<string[]>(`${this.url}`)
  }


  async getDialogById(id:string){
    return api.get<Message[]>(`${this.url}/${id}`)
  }


}



export const dialogsService = new DialogsService()
