import {api} from "./axios";
import {File} from "../types/files";

class BotDocuments{

  private url ='/files'


  async loadDocuments(file:File){
    return api.post(`${this.url}`, {...file})

  }

  async deleteDocument(documentId:string){
    return api.delete(`${this.url}/${documentId}`)
  }

  async getDocuments(){
    return api.get<File[]>(`${this.url}`)
  }
}



export const botDocuments = new BotDocuments()
