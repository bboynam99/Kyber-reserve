import CONSTANT from "../constant"
import BigNumber from "bignumber.js"

export function mappingTokenRate(token, data){
  if(data && typeof data == 'object'){
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

export function mappingTokenBalance(data){
  return Object.keys(CONSTANT.SUPPORTED_EXCHANGE).map(exchangeName => {
    let tokenValue = data && typeof data == 'object' && data.Balance ? data.Balance : 0

    return { 
      exchange: CONSTANT.SUPPORTED_EXCHANGE[exchangeName].name,
      value: tokenValue
    }
  })
}

export function mappingQty(data){
  if(data && typeof data == 'object'){
    return {current: data.current, target: data.target}
  } else {
    return {current: 0, target: 0}
  }
}

export function mappingAllRate(data){
  let returnObj = {}

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

export function mappingAllExchangeBalance(data){
  let returnObj = {}
  
  Object.keys(CONSTANT.SUPPORTED_TOKENS).map((tokenSymbol) => {
    let tokenBalanceObj = {}
    Object.keys(CONSTANT.SUPPORTED_EXCHANGE).map(exchangeSymbol => {
      let exchangeName = CONSTANT.SUPPORTED_EXCHANGE[exchangeSymbol].name
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

export function mappingAllReserveBalance(data){
  let returnObj = {}
  Object.keys(CONSTANT.SUPPORTED_TOKENS).map((tokenSymbol) => {
    returnObj[tokenSymbol] = data[tokenSymbol].Balance ? data[tokenSymbol].Balance : 0
  })

  // {
  //   ADX: 0,
  //   BAT: 0,
  //   ...
  // }
  return returnObj
}

function shortRateASC(arrayObj){
  if(arrayObj && Array.isArray(arrayObj) && arrayObj.length){
    return arrayObj.sort((a,b) => {
      return a.Rate - b.Rate
    })
  } else {
    return []
  }
}

function shortRateDESC(arrayObj){
  if(arrayObj && Array.isArray(arrayObj) && arrayObj.length){
    return arrayObj.sort((a,b) => {
      return b.Rate - a.Rate
    })
  } else {
    return []
  }
}

export function mappingRateForDeptChart(data){
  if(data){
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