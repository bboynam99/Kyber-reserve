import CONSTANT from "./constant"

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
        ask: pairData[exchangeName].Asks[0],
        bid: pairData[exchangeName].Bids[0]
      }
    ))
  })

  return returnObj
}

export function mappingAllExchangeBalance(data){
  let returnObj = {}
  
  Object.keys(CONSTANT.SUPPORTED_TOKENS).map((tokenSymbol) => {
    let tokenBalanceObj = {}
    Object.keys(CONSTANT.SUPPORTED_EXCHANGE).map(exchangeSymbol => {
      let exchangeName = CONSTANT.SUPPORTED_EXCHANGE[exchangeSymbol].name
      tokenBalanceObj[exchangeSymbol] = {
        AvailableBalance: data[exchangeName] ? data[exchangeName].AvailableBalance[tokenSymbol] : 0,
        DepositBalance: data[exchangeName] ? data[exchangeName].DepositBalance[tokenSymbol] : 0,
        LockedBalance: data[exchangeName] ? data[exchangeName].LockedBalance[tokenSymbol] : 0
      }
    })
    returnObj[tokenSymbol] = tokenBalanceObj
  })

  return returnObj
}

export function mappingAllReserveBalance(data){
  let returnObj = {}
  Object.keys(CONSTANT.SUPPORTED_TOKENS).map((tokenSymbol) => {
    returnObj[tokenSymbol] = data[tokenSymbol].Balance ? data[tokenSymbol].Balance : 0
  })

  return returnObj
}