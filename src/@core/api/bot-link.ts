import {api} from "./axios";

class BotLink{

  url = 'bot-link'

  async createBot(){
    return api.post(this.url)
  }

  async updateBot(botId:number){
    return api.put(`${this.url}/${botId}`)
  }



}


export const botLink = new BotLink()
