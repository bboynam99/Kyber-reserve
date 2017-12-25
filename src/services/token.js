

export default class Token {
  constructor(
    info,
    persent = 0,
    qty = 0,
    rates = 0,
    balances = 0
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