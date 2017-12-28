import Token from "./token"
import CONSTANT from "./constant"
import { mappingTokenRate, mappingTokenBalance, mappingQty, 
  mappingAllRate, mappingAllExchangeBalance, mappingAllReserveBalance} from "./utils/standardize"

export default class TokensService {
  constructor() {
    this.tokens = {}
    Object.keys(CONSTANT.SUPPORTED_TOKENS).forEach((tokenName) => {
      this.tokens[tokenName] = new Token(CONSTANT.SUPPORTED_TOKENS[tokenName]);
    })
  }

  getTokens() {
    return this.tokens
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

    Object.keys(CONSTANT.SUPPORTED_TOKENS).forEach((tokenSymbol) => {
      if(mappedAllRate[tokenSymbol]) {
        this.tokens[tokenSymbol].setRates(mappedAllRate[tokenSymbol])
      }

      if(mappedAllExchangeBalance[tokenSymbol]) {
        this.tokens[tokenSymbol].setExchangeBalance(mappedAllExchangeBalance[tokenSymbol])
      }

      if(mappedAllReserveBalance[tokenSymbol]){
        this.tokens[tokenSymbol].setReserveBalance(mappedAllReserveBalance[tokenSymbol])
      }
    })

    return this.tokens
  }

}
