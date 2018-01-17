import CONSTANTS from "../constants"
import BigNumber from "bignumber.js"

import { toT } from "./converter"

export function mappingTokenRate(token, data) {
  if (data && typeof data == 'object') {
    let returnData = []       // array[{rate: 'Reserve', symbol: 'KNC/ETH', ask: (0.7697399673695822), bid: 0.8697399673695822}]
    Object.keys(data).map((exchangeId) => {
      returnData.push({
        rate: exchangeId,
        symbol: token + "/ETH",
        ask: data[exchangeId].Asks[0].Rate,
        bid: data[exchangeId].Bids[0].Rate
      })
    })
    return returnData
  } else {
    return []
  }
}

export function mappingTokenBalance(data) {
  return Object.keys(CONSTANTS.SUPPORTED_EXCHANGE).map(exchangeName => {
    let tokenValue = data && typeof data == 'object' && data.Balance ? data.Balance : 0

    return {
      exchange: CONSTANTS.SUPPORTED_EXCHANGE[exchangeName].name,
      value: tokenValue
    }
  })
}

export function mappingQty(data) {
  if (data && typeof data == 'object') {
    return { current: data.current, target: data.target }
  } else {
    return { current: 0, target: 0 }
  }
}

export function mappingAllRate(data) {
  let returnObj = {}

  if(data){
    Object.keys(data).map((pair) => {
      let tokenSymbol = pair.split('-')[0]
      let pairData = data[pair]
  
      returnObj[tokenSymbol] = Object.keys(pairData).map((exchangeName) => (
        {
          exchange: exchangeName,
          symbol: tokenSymbol + "/ETH",
          ask: pairData[exchangeName].Asks,
          bid: pairData[exchangeName].Bids
        }
      ))
    })
  }
  // {
  //   ADX: {
  //     exchange: "bittrex",
  //     symbol: "ADX/ETH",
  //     ask: {Quantity: 7403.704, Rate: 0.00379639},
  //     bid: {Quantity: 1231.32827485, Rate: 0.00365459}
  //   }
  //   BAT: {...}
  // }
  return returnObj
}

export function mappingKyberRate(data) {
  if (!data) return null
  let returnObj = {}

  Object.keys(data).map(tokenSymbol => {
    if (tokenSymbol.toLowerCase() == "eth") return

    let dataRate = data[tokenSymbol]
    let bigBaseBuy = new BigNumber(dataRate.BaseBuy.toString())
    let bigCompactBuy = new BigNumber(dataRate.CompactBuy.toString())
    let ask = (bigCompactBuy.div(1000).add(1)).times(bigBaseBuy).pow(-1)

    let bigBaseSell = new BigNumber(dataRate.BaseSell.toString())
    let bigCompactSell = new BigNumber(dataRate.CompactSell.toString())
    let bid = (bigCompactSell.div(1000).add(1)).times(bigBaseSell)

    returnObj[tokenSymbol] = {
      exchange: "Kyber Network",
      symbol: tokenSymbol + "/ETH",
      ask: { Quantity: 0, Rate: ask.toString() },
      bid: { Quantity: 0, Rate: bid.toString() }
    }
  })

  return returnObj
}

export function mappingAllExchangeBalance(data) {
  let returnObj = {}

  Object.keys(CONSTANTS.SUPPORTED_TOKENS).map((tokenSymbol) => {
    let tokenBalanceObj = {}
    Object.keys(CONSTANTS.SUPPORTED_EXCHANGE).map(exchangeSymbol => {
      let exchangeName = CONSTANTS.SUPPORTED_EXCHANGE[exchangeSymbol].name
      tokenBalanceObj[exchangeSymbol] = {
        AvailableBalance: data[exchangeName] && data[exchangeName].AvailableBalance[tokenSymbol] ? data[exchangeName].AvailableBalance[tokenSymbol] : 0,
        DepositBalance: data[exchangeName] && data[exchangeName].DepositBalance[tokenSymbol] ? data[exchangeName].DepositBalance[tokenSymbol] : 0,
        LockedBalance: data[exchangeName] && data[exchangeName].LockedBalance[tokenSymbol] ? data[exchangeName].LockedBalance[tokenSymbol] : 0
      }
    })
    returnObj[tokenSymbol] = tokenBalanceObj
  })

  // ADX{
  //   BINANCE: {
  //     AvailableBalance: 0
  //     DepositBalance: 0
  //     LockedBalance: 0
  //   },
  //   BITTFINEX: {...},
  //   BITTREX: {...},
  //   LIQUI: {...},
  //   POLONIEX: {..}
  // }
  // ...

  return returnObj
}

export function mappingAllReserveBalance(data) {
  let returnObj = {}
  Object.keys(CONSTANTS.SUPPORTED_TOKENS).map((tokenSymbol) => {
    returnObj[tokenSymbol] = data[tokenSymbol].Balance ? data[tokenSymbol].Balance.toString() : 0
  })

  // {
  //   ADX: 0,
  //   BAT: 0,
  //   ...
  // }
  return returnObj
}

function shortRateASC(arrayObj) {
  if (arrayObj && Array.isArray(arrayObj) && arrayObj.length) {
    return arrayObj.sort((a, b) => {
      return a.Rate - b.Rate
    })
  } else {
    return []
  }
}

function shortRateDESC(arrayObj) {
  if (arrayObj && Array.isArray(arrayObj) && arrayObj.length) {
    return arrayObj.sort((a, b) => {
      return b.Rate - a.Rate
    })
  } else {
    return []
  }
}

export function mappingRateForDepthChart(data) {
  if (data) {
    let askTmp = 0
    let bidTmp = 0
    let bidArray = shortRateDESC(data.bid).map((b) => {
      bidTmp += b.Quantity
      return {
        BidQuantity: bidTmp,
        Rate: b.Rate
      }
    }).reverse()

    let askArray = shortRateASC(data.ask).map((a) => {
      askTmp += a.Quantity
      return {
        AskQuantity: askTmp,
        Rate: a.Rate
      }
    })
    return bidArray.concat(askArray)
  } else {
    return []
  }
}


export function filterSetRateAction(arrayAction){
  let returnArry = []
  if(arrayAction && Array.isArray(arrayAction) && arrayAction.length){
    returnArry = arrayAction.filter(item => {
      return item.Action.toLowerCase() == "set_rates"
    })
  }
  return returnArry
}

export function mappingSetRateHistory(arraySetRate){
  let ratesObj = {}
  if(arraySetRate && Array.isArray(arraySetRate) && arraySetRate.length){
    arraySetRate.map(item => {
      item.Params.tokens.map((tokenSymbol, index) => {
        if(!ratesObj[tokenSymbol]) ratesObj[tokenSymbol] = []

        ratesObj[tokenSymbol].unshift({
          // index: index.toString(),
          buy: toT(item.Params.buys[index], 18, 8, true),
          sell: toT(item.Params.sells[index], 18, 8)
        })
        // ratesObj[tokenSymbol].buys.push(item.Params.buys[index])
        // ratesObj[tokenSymbol].sells.push(item.Params.sells[index])
      })
    })
  }

  return ratesObj
}

var sleep = time => new Promise(resolve => setTimeout(resolve, time))
export function poll(promiseFn, time){
  return promiseFn().then(
    sleep(time).then(
      () => poll(promiseFn, time)
    )
  )
} 

// export function poll(promiseFn, time){
//   return sleep(time).then(
//     () => promiseFn().then(
//       () => poll(promiseFn, time)
//     )
//   )
// } 