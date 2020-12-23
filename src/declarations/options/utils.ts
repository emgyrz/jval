import { castBool, isBool, isNil, isNum, isStr, isUint } from '../../hlp'

type Indexed = Record<string, unknown>

export function getBool( obj: Indexed, key: string, def?: boolean ): never | boolean {
  const res = getBoolOrNull( obj, key )
  return castBool( res, castBool( def, false ) )
}

export function getBoolOrNull( obj: Indexed, key: string ): never | null | boolean {
  const val = obj[ key ]
  if ( isNil( val ) ) return null
  if ( isBool( val ) ) return val
  throw `"${ key }" must be a boolean`
}

export function getStrOrNull( obj: Indexed, key: string ): never | null | string {
  const val = obj[ key ]
  if ( isNil( val ) ) return null
  if ( isStr( val ) ) return val
  throw `"${ key }" must be a string`
}

export function getNumOrNull( obj: Indexed, key: string ): never | null | number {
  const val = obj[ key ]
  if ( isNil( val ) ) return null
  if ( isNum( val ) ) return val
  throw `"${ key }" must be a number`
}

export function getUintOrNull( obj: Indexed, key: string ): never | null | number {
  const val = obj[ key ]
  if ( isNil( val ) ) return null
  if ( isUint( val ) ) return val
  throw `"${ key }" must be an unsigned integer`
}

