import queryString from 'query-string';
import {api} from "./axios";

class PromptService{

  private url ='admin/prompts'


  async getPrompt(){
    return api.get<{text:string}>(`${this.url}`)
  }


  async updatePrompt(prompt:string){

    return api.put<string>(`${this.url}`, {text:prompt})
  }




}

export const promptService = new PromptService()
