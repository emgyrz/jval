import { isF, isNil, isObj, isStr } from 'hlp'
import { JValue } from '../JValue'
import type { ConvertOptionType } from './types'


export {
  getOptionalConvertOption,
}


interface IMaybeHasConvert {
  convert?: string | ConvertOptionType,
}

function getOptionalConvertOption(
  obj: IMaybeHasConvert,
): never | null | string | ConvertOptionType {
  const val = obj.convert
  if ( isNil( val ) ) return null
  if ( isStr( val ) ) return val
  if ( isConvertOptionObjValid( val ) ) return val

  throw '"convert" option must be a string alias or object' +
  ' with valid "returnType" and "method" fields'
}

function isConvertOptionObjValid( obj: unknown ): obj is ConvertOptionType {
  return isObj( obj )
    && validateReturnType( obj.returnType )
    && validateMethod( obj.method )
}


function validateReturnType( rt: unknown ): rt is ( JValue | typeof Date ) {
  return JValue.isJValue( rt ) || rt === Date
}


function validateMethod( method: unknown ): method is CallableFunction {
  return isF( method )
}
