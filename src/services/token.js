
import { mappingTokenRate, mappingTokenBalance, mappingQty } from "./utils/standardize"
import CONSTANT from "./constant"
import { flatten } from "./utils/converter"

export default class Token {
  constructor(
    info,
    persent = 0,
    reserveBalance = CONSTANT.INNIT_TOKEN_RESERVE_BALANCE,
    reserveTarget = 0,
    totalQty = 0,
    totalTarget = 0,
    rates = CONSTANT.INNIT_TOKEN_RATES,                                  // { bittrex: {ask: xxx, bid: xxxx}, ...}
    exchangeBalance = CONSTANT.INNIT_TOKEN_EXCHANGE_BALANCE,             // { bittrex: 0, binance: 0, ...}
  ){
    this.info = info
    this.persent = persent

    this.reserveBalance = reserveBalance
    this.reserveTarget = reserveTarget

    this.totalTarget = totalTarget

    this.rates = rates
    this.exchangeBalance = exchangeBalance

    this.totalQty = this.caculateTotalBalance()
  }

  setRates(rates){
    this.rates = rates
  }

  setExchangeBalance(exchangeBalance){
    this.exchangeBalance = exchangeBalance
    this.totalQty = this.caculateTotalBalance()
  }

  setReserveBalance(reserveBalance){
    this.reserveBalance = reserveBalance
    this.totalQty = this.caculateTotalBalance()
  }

  caculateTotalBalance(balances){
    let flattenBalances = flatten(this.exchangeBalance)
    let sumExchange = Object.values(flattenBalances).reduce((a, b) => a + b, 0)
    return sumExchange + this.reserveBalance
  }

}