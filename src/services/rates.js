
import CONSTANTS from "./constants"

import { BigNumber } from "bignumber.js";
import { filterSetRateAction, mappingSetRateHistory } from "./utils/standardize"
import { stretchArray } from "./utils/converter"

export default class RatesService {
  constructor() {
    this.rates = { 
      data: {},
    }
  }
  

  getAllActivities(apiService){
    return apiService.getAllActivities()
  }

  async syncAllRates(apiService){
    let allActivities = await this.getAllActivities(apiService)
    let setRateActionList = filterSetRateAction(allActivities.data)

    let stretedData = stretchArray(setRateActionList, 10)

    let mappedRateTokens = mappingSetRateHistory(stretedData)

    


    return mappedRateTokens
  }



}
