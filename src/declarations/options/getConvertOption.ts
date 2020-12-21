
import { isF, isNil, isObj, isStr } from '../../hlp'

import { err, ok } from "../../result"
import { JValue } from "../JValue"
import type { Result } from "../../result"
import type { ConvertOptionType } from './types'


export {
  getOptionalConvertOption,
}


interface IMaybeHasConvert {
  convert?: string | ConvertOptionType
}

function getOptionalConvertOption(
  obj: IMaybeHasConvert,
): Result<null | string | ConvertOptionType, string> {
  const val = obj.convert
  if ( isNil( val ) ) return ok( null )
  if ( isStr( val ) ) return ok( val )
  if ( isConvertOptionObjValid( val ) ) return ok( val )
  const msg = '"convert" option must be a string alias or object' +
    ' with valid "returnType" and "method" fields'
  return err( msg )
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
