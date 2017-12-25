import Token from "./token"
import CONSTANT from "./constant"
import { mappingTokenRate, mappingTokenBalance, mappingQty } from "./standardize"

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
    return service.getBalanceAllTokenOnBlockChain()
  }

  getAllQty(service) {
    return service.getAllQty()
  }

  async syncAll(service) {
    let [allRate, allBalance, allQty] = await Promise.all([
      this.getAllRate(service),
      this.getAllBalance(service),
      this.getAllQty(service)
    ])

    if (allRate && allRate.data && allRate.success) {
      Object.keys(allRate.data).forEach((pair) => {
        let tokenSymbol = pair.split('-')[0]
        if (tokenSymbol && this.tokens[tokenSymbol]) {
          let mappedRate = mappingTokenRate(tokenSymbol, allRate.data[pair])
          this.tokens[tokenSymbol].setRates(mappedRate)
        }
      })
    }

    if (allBalance && allBalance.data && allBalance.success) {
      Object.keys(allBalance.data).forEach((tokenSymbol) => {
        let mappedBalance = mappingTokenBalance(allBalance.data[tokenSymbol])
        this.tokens[tokenSymbol].setBalance(mappedBalance)
      })
    }

    if (allQty && allQty.data && allQty.success) {
      Object.keys(allQty.data).forEach((tokenSymbol) => {
        let mappedQty = mappingQty(allQty.data[tokenSymbol])
        this.tokens[tokenSymbol].setQty(mappedQty)
      })
    }
    return this.tokens
  }

}
