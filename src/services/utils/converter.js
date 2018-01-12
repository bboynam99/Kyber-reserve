
import BigNumber from "bignumber.js"


export function roundingNumber(number, maxDigis = 7, size = 3) {
  if(!number) return 0
  number = +number;
  let numberStr = number.toString();
  if (Number.isInteger(number) && numberStr.length >= maxDigis) {
    return number.toLocaleString();
  }
  if (isNaN(number) || number <= 0) number = 0;
  if (number < 1e-7) number = 0;

  let precision = number.toPrecision((number < 1 && number > 0) ? maxDigis - 1 : maxDigis),
      arr = precision.split('.'),
      intPart = arr[0],
      i = intPart.length % size || size,
      result = intPart.substr( 0, i );

  for ( ; i < intPart.length; i += size ) {
    result += ',' + intPart.substr( i, size );
  }
  if(arr[1]){
    result += '.' + arr[1];
  }
  return result;
}

export function flatten(object){
  return Object.assign( {}, ...function _flatten( objectBit, path = '' ) {  
    return [].concat(                                                       
      ...Object.keys( objectBit ).map(                                     
        key => typeof objectBit[ key ] === 'object' ?                       
          _flatten( objectBit[ key ], `${ path }/${ key }` ) :              
          ( { [ `${ path }/${ key }` ]: objectBit[ key ] } )                
      )
    )
  }( object ) );
}

export function stretchArray(array, number){
  let returnArray = []
  if(array && Array.isArray(array)){
    array.map((item, index) => {
      if(index % number == 0){
        returnArray.push(item)
      }
    })
  }
  return returnArray
}

export function minimizeId(idString){
  if(idString && typeof idString == 'string'){
    var idSplit = idString.split('|')
    return idSplit[0] + "|..."
  } else {
    return ''
  }
}

function acceptableTyping(number) {
  // ends with a dot
  if (number.length > 0 && number[number.length - 1] == ".") {
    return true
  }

  // TODO refactor format
  // zero suffixed with real number
  // if (number.length > 0 && number[number.length - 1] == "0") {
  //   for (var i = 0; i < number.length; i++) {
  //     if (number[i] == ".") {
  //       return true
  //     }
  //   }
  // }
  return false
}

export function toT(number, decimal, round) {
  var bigNumber = new BigNumber(number.toString())
  var result
  if (bigNumber == 'NaN' || bigNumber == 'Infinity') {
    return number
  } else if (acceptableTyping(number)) {
    return number
  }
  if (decimal) {
    result = bigNumber.div(Math.pow(10, decimal));
  }
  else {
    result = bigNumber.div(1000000000000000000)
  }
  if (round) {
    return result.round(round).toString()
  } else {
    return result.toString()
  }
}

// export function caculateEthBalance(token){
//   if(token.symbol.toLowerCase() == 'eth'){
//     return token.balance
//   } else {
//     var rateBig = new BigNumber(token.rate)
//     var balanceBig = new BigNumber(token.balance)
//     var weiParam = new BigNumber(10)
//     var balanceToken = balanceBig.div(weiParam.pow(token.decimal))

//     var balanceEth = balanceToken.times(rateBig)
//     return balanceEth.toString()
//   }
// }

function caculateAverageExchangeRate(rates){
  if(!rates || !Array.isArray(rates) || !rates.length){
    return 0
  }
  let rateExchanges = rates.map(rate => {
    let bigRateAsk = new BigNumber(rate.ask[0].Rate.toString()) 
    let bigRateBid = new BigNumber(rate.bid[0].Rate.toString())
    return bigRateAsk.add(bigRateBid).div(2)
  })
  let rateSum = rateExchanges.reduce((a,b) => {
    return a.add(b)
  }, new BigNumber(0))
  return rateSum.div(rates.length)
}

export function caculateEthBalance(tokenBalance, ratesToEth){
  if(!tokenBalance) return 0
  
  let rateAverage = caculateAverageExchangeRate(ratesToEth)
  if(!rateAverage) return 0

  let balanceBig = new BigNumber(tokenBalance.toString())

  let balanceEth = balanceBig.times(rateAverage)
  return balanceEth.toString()
}


