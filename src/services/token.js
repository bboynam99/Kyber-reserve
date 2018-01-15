
import { mappingTokenRate, mappingTokenBalance, mappingQty } from "./utils/standardize"
import CONSTANTS from "./constants"
import { flatten } from "./utils/converter"
import { caculateEthBalance } from "../services/utils/converter"
import { BigNumber } from "bignumber.js";

export default class Token {
  constructor(
    info,
    persent = 0,
    reserveBalance = CONSTANTS.INNIT_TOKEN_RESERVE_BALANCE,
    reserveTarget = 0,
    totalQty = 0,
    totalTarget = 0,
    rates = CONSTANTS.INNIT_TOKEN_RATES,                                  // { bittrex: {ask: xxx, bid: xxxx}, ...}
    kyberRate = CONSTANTS.INNIT_KYBER_RATE,
    exchangeBalance = CONSTANTS.INNIT_TOKEN_EXCHANGE_BALANCE,             // { bittrex: 0, binance: 0, ...}
    estimateEthValue = 0,
  ){
    this.info = info
    this.persent = persent

    this.reserveBalance = reserveBalance
    this.reserveTarget = reserveTarget

    this.totalTarget = totalTarget

    this.rates = rates
    this.kyberRate = kyberRate

    this.exchangeBalance = exchangeBalance

    this.totalQty = this.caculateTotalBalance()

    this.estimateEthValue = this.caculateEthBalance(this.totalQty, this.rates)
  }

  setRates(rates){
    this.rates = rates
  }

  setKyberRate(kyberRate){
    this.kyberRate = kyberRate
  }

  setExchangeBalance(exchangeBalance){
    this.exchangeBalance = exchangeBalance
    this.totalQty = this.caculateTotalBalance()
  }

  setReserveBalance(reserveBalance){
    this.reserveBalance = reserveBalance
    this.totalQty = this.caculateTotalBalance()
    this.estimateEthValue = this.caculateEthBalance(this.totalQty, this.rates)
  }

  caculateEthBalance = (balance, rates) => {
    if(this.info && this.info.symbol.toLowerCase() == "eth"){
      return balance.toString()
    }
    let ethBalance = caculateEthBalance(balance, rates)
    return ethBalance
  }

  setReserveTarget(reserveTarget){
    this.reserveTarget = reserveTarget
  }

  setTotalTarget(totalTarget){
    this.totalTarget = totalTarget
  }

  caculateTotalBalance(balances){
    let flattenBalances = flatten(this.exchangeBalance)
    return Object.values(flattenBalances)
      .map(x => x.toString())
      .reduce((a, b) => {
        let bigA = new BigNumber(a)
        let bigB = new BigNumber(b)
        return bigA.add(bigB)
      }, new BigNumber(this.reserveBalance))
  }

}