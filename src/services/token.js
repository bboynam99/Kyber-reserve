
import { mappingTokenRate, mappingTokenBalance, mappingQty } from "./standardize"

export default class Token {
  constructor(
    info,
    persent = 0,
    qty = mappingQty(null),
    rates = mappingTokenRate(null, 0),
    balances = mappingTokenBalance(null)
  ){
    this.info = info
    this.persent = persent
    this.qty = qty
    this.rates = rates
    this.balances = balances
  }

  setRates(rates){
    this.rates = rates
  }

  setBalance(balances){
    this.balances = balances
  }

  setQty(qty){
    this.qty = qty
  }


}