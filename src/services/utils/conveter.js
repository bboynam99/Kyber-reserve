

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
};