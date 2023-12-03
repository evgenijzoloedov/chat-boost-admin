import {api} from "./axios";
import {Step} from "../types/step";

class StepsService{

  private url = '/steps'

  async getSteps(){

  return  api.get<Step[]>(this.url)

  }


  updateSteps(steps:Step[]){
    return api.post(this.url, steps)
  }

}


export const stepsService = new StepsService()
