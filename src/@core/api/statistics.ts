import {api} from "./axios";
import {DialogsRanking} from "../types/statistics";

class StatisticsService{

  private url = '/admin/metrics'


  async getCreationStatistics(){
    return api.get<DialogsRanking>(`${this.url}/success_metric`)
  }

}



export const statisticsService = new StatisticsService()
