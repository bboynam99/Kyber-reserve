import Token from "./token"
import CONSTANTS from "./constants"
import { mappingTokenRate, mappingTokenBalance, mappingQty, 
  mappingAllRate, mappingAllExchangeBalance, mappingAllReserveBalance} from "./utils/standardize"
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

  async syncAll(service) {
    let [allRate, allBalance] = await Promise.all([
      this.getAllRate(service),
      this.getAllBalance(service)
    ])
    let mappedAllRate = mappingAllRate(allRate.data)

    let mappedAllExchangeBalance = mappingAllExchangeBalance(allBalance.data.ExchangeBalances)

    let mappedAllReserveBalance = mappingAllReserveBalance(allBalance.data.ReserveBalances)
    let dataToken = this.tokens.data
    Object.keys(CONSTANTS.SUPPORTED_TOKENS).forEach((tokenSymbol) => {
      if(mappedAllRate[tokenSymbol]) {
        dataToken[tokenSymbol].setRates(mappedAllRate[tokenSymbol])
      }

      if(mappedAllExchangeBalance[tokenSymbol]) {
        dataToken[tokenSymbol].setExchangeBalance(mappedAllExchangeBalance[tokenSymbol])
      }

      if(mappedAllReserveBalance[tokenSymbol]){
        dataToken[tokenSymbol].setReserveBalance(mappedAllReserveBalance[tokenSymbol])
      }
    })

    if(dataToken){
      this.tokens.totalAllQty = Object.values(dataToken)
      .map(x => new BigNumber(x.estimateEthValue))
      .reduce((a,b) => {
        return a.add(b)
      }, new BigNumber(0))
      .toString()
    }

    this.tokens.data = dataToken
    this.tokens.pendingActivities = allBalance.data.PendingActivities

    return this.tokens
  }

}
