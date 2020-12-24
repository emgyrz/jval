export function jstr( val: unknown ): string {
  if ( isStr( val ) ) return val
  return `"${JSON.stringify( val )}"`
}
//
// export function objHas( obj: unknown, key: string ): boolean {
//   return isObj( obj ) && obj.hasOwnProperty( key )
// }

//
// export function isPrimitiveArraysSimilar( arr: unknown[], other: unknown[] ): boolean {
//   if ( arr.length !== other.length ) return false
//   const arrCopy = arr.slice( 0 ).sort()
//   const otherCopy = other.slice( 0 ).sort()
//
//   for ( let i = 0; i < arrCopy.length; i++ ) {
//     if ( arrCopy[ i ] !== otherCopy[ i ] ) return false
//   }
//   return true
// }



//
// Number
//
const _isFinite = isF( Number.isFinite ) ? Number.isFinite : isFinite

export function isNum( n: unknown ): n is number {
  return typeof n === 'number' && _isFinite( n )
}

export function isInt( n: unknown ): n is number {
  return isNum( n ) && ( n % 1 === 0 )
}

export function isFloat( n: unknown ): n is number {
  return isNum( n ) && ( n % 1 !== 0 )
}

export function isUint( n: unknown ): n is number {
  return isInt( n ) && n >= 0
}

//
// String
//
export function isStr( s: unknown ): s is string {
  return typeof s === 'string'
}
// export function castStr( s: unknown, def?: string ): string {
//   if ( isStr( s ) ) return s
//   return isStr( def ) ? def : ''
// }

//
// Boolean
//
export function isBool( b: unknown ): b is boolean {
  return typeof b === 'boolean'
}
// export function isBool( b: unknown ): b is boolean {
//   return typeof b === 'boolean'
// }

export function castBool( b: unknown, def?: boolean ): boolean {
  if ( isBool( b ) ) return b
  return isBool( def ) ? def : false
}

//
// Object
//
export function isObj( o: unknown ): o is Record<string, unknown> {
  return Object.prototype.toString.call( o ) === '[object Object]'
}

//
// Function
//
export function isF( f: unknown ): f is CallableFunction {
  return f instanceof Function
}


//
// null & undefined
//
export function isNil( some: unknown ): some is null | undefined {
  return some === null || some === undefined
}



//
// Date
//
const _toStr = Object.prototype.toString
const _dateTypeStr = '[object Date]'
export function isDate( some: unknown ): some is Date {
  return _toStr.call( some ) === _dateTypeStr
}

export function isValidDate( some: unknown ): some is Date {
  return isDate( some ) && !isNaN( some.getTime() )
}
