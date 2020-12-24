import { isObj, isStr } from 'hlp'
import { getNullOrOptional } from '../utils'
import { convert } from '../convert'
import { isValid } from '../isValid'
import type { JObject, JValue } from '../../declarations'


export {
  get as getObj,
  isValidWithProperties as isObjValid,
}


function get( decl: JObject, value: unknown ): undefined | null | Record<string, unknown> {
  if ( isValidSimple( decl, value ) ) {
    return getFilledValidObj( decl, value )
  }
  return getNullOrOptional( decl, value )
}


function isValidSimple( decl: JObject, value: unknown ): value is Record<string, unknown> {
  return isObj( value )
}


function getFilledValidObj( decl: JObject, obj: Record<string, unknown> ): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  forEach( decl, obj, ( key: string, prop: unknown, propDecl: JValue ): boolean => {
    const converted = convert( propDecl, prop )
    if ( converted !== undefined ) {
      const name = isStr( propDecl.rename ) ? propDecl.rename : key
      result[ name ] = converted
    }
    return false
  } )
  return result
}


function isValidWithProperties( decl: JObject, value: unknown ): value is Record<string, unknown> {
  if ( !isValidSimple( decl, value ) ) return false
  let isPropsValid = true
  forEach( decl, value, ( key: string, prop: unknown, propDecl: JValue ): boolean => {
    if ( !isValid( propDecl, prop ) ) {
      isPropsValid = false
      return true
    }
    return false
  } )
  return isPropsValid
}


type Cb = ( key: string, prop: unknown, decl: JValue ) => boolean

function forEach( decl: JObject, obj: Record<string, unknown>, cb: Cb ): void {
  const declKeys = Object.keys( decl.props )
  for ( let i = 0; i < declKeys.length; i++ ) {
    const key = declKeys[ i ]
    const prop = obj[ key ]
    const cbIsReached = cb( key, prop, decl.props[ key ] )
    if ( cbIsReached ) break
  }
}

