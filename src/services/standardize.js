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