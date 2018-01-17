
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

  getAllActivities(apiService, timeStamp){
    timeStamp++
    return apiService.getAllActivities(timeStamp)
  }

  async syncAllRates(apiService, timeStamp){
    let allActivities = await this.getAllActivities(apiService, timeStamp)
    let setRateActionList = filterSetRateAction(allActivities.data)

    // setRateActionList = stretchArray(setRateActionList, 15)
    let mappedRateTokens = mappingSetRateHistory(setRateActionList)

    let currentTimeStamp = setRateActionList && setRateActionList.length ? setRateActionList[0].ID.split('|')[0] : 0
    return {
      data: mappedRateTokens,
      currentTimeStamp: currentTimeStamp
    }
  }

}
