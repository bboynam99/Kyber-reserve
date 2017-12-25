
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
  if(data && typeof data == 'object'){
    return { exchange: 'Bittrex', value: data.Balance }
  }
}

export function mappingQty(data){
  if(data && typeof data == 'object'){
    return {current: data.current, target: data.target}
  }
}