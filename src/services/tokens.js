import Token from "./token"
import CONSTANTS from "./constants"
import { mappingTokenRate, mappingTokenBalance, mappingQty, 
  mappingAllRate, mappingAllExchangeBalance, mappingAllReserveBalance,
  mappingKyberRate, mappingAllPendingAmount } from "./utils/standardize"
import { BigNumber } from "bignumber.js";

export default class TokensService {
  constructor() {
    this.tokens = { 
      data: {}, 
      pendingActivities: [],
      totalAllQty: 0
    }
    Object.keys(CONSTANTS.SUPPORTED_TOKENS).forEach((tokenName) => {
      this.tokens.data[tokenName] = new Token(CONSTANTS.SUPPORTED_TOKENS[tokenName]);
    })
  }

  getTokens() {
    return this.tokens.data
  }

  getAllRate(service) {
    return service.getPriceAllBaseQuotePair()
  }

  getAllBalance(service) {
    return service.getAuthData()
  }

  getAllKyberRate(service){
    return service.getAllKyberRate()
  }

  getEvaluate(service){
    return service.getEvaluate()
  }

  async syncAll(service) {
    let [allRate, allBalance, allKyberRate, evaluate] = await Promise.all([
      this.getAllRate(service),
      this.getAllBalance(service),
      this.getAllKyberRate(service),
      this.getEvaluate(service)
    ])

    let mappedAllRate = mappingAllRate(allRate.data)

    let mappedAllKyberRate = mappingKyberRate(allKyberRate.data)

    let mappedAllExchangeBalance = mappingAllExchangeBalance(allBalance.data.ExchangeBalances)

    let mappedAllPendingAmount = mappingAllPendingAmount(allBalance.data.PendingActivities)

    let mappedAllReserveBalance = mappingAllReserveBalance(allBalance.data.ReserveBalances)

    let allTarget = evaluate.evaluate ? evaluate.evaluate.target : null

    let dataToken = this.tokens.data
    Object.keys(CONSTANTS.SUPPORTED_TOKENS).forEach((tokenSymbol) => {
      if(mappedAllRate[tokenSymbol]) {
        dataToken[tokenSymbol].setRates(mappedAllRate[tokenSymbol])
      }

      if(mappedAllKyberRate[tokenSymbol]) {
        dataToken[tokenSymbol].setKyberRate(mappedAllKyberRate[tokenSymbol])
      }

      if(mappedAllPendingAmount[tokenSymbol]){
        dataToken[tokenSymbol].setPendingAmount(mappedAllPendingAmount[tokenSymbol])
      }

      if(mappedAllExchangeBalance[tokenSymbol]) {
        dataToken[tokenSymbol].setExchangeBalance(mappedAllExchangeBalance[tokenSymbol])
      }

      if(mappedAllReserveBalance[tokenSymbol]){
        dataToken[tokenSymbol].setReserveBalance(mappedAllReserveBalance[tokenSymbol])
      }

      if(allTarget && allTarget[tokenSymbol]){
        dataToken[tokenSymbol].setReserveTarget(allTarget[tokenSymbol].reserve_target)
        dataToken[tokenSymbol].setTotalTarget(allTarget[tokenSymbol].target)
      }
    })

    //// Caculate all Qty of all token in portfolio
    // if(dataToken){
    //   this.tokens.totalAllQty = Object.values(dataToken)
    //   .map(x => new BigNumber(x.estimateEthValue))
    //   .reduce((a,b) => {
    //     return a.add(b)
    //   }, new BigNumber(0))
    //   .toString()
    // }

    this.tokens.data = dataToken
    this.tokens.pendingActivities = allBalance.data.PendingActivities

    return this.tokens
  }

}
