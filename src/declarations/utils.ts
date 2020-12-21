import { err, isErr, ok, Result } from "../result"
import { castBool, isBool, isNil, isStr } from "../hlp"
import type { Indexed } from "./types"


export function getBool( obj: Indexed, key: string, def?: boolean ): Result<boolean, string> {
  const res = getBoolOrNull( obj, key )
  if ( isErr( res ) ) return res
  const val = res.value
  if ( isBool( val ) ) return res as Result<boolean, string>
  return ok( castBool( def, false ) )
}

export function getBoolOrNull( obj: Indexed, key: string ): Result<null | boolean, string> {
  const val = obj[ key ]
  if ( isNil( val ) ) return ok( null )
  if ( isBool( val ) ) return ok( val )
  return err( `"${ key }" must be a boolean` )
}

export function getStrOrNull( obj: Indexed, key: string ): Result<null | string, string> {
  const val = obj[ key ]
  if ( isNil( val ) ) return ok( null )
  if ( isStr( val ) ) return ok( val )
  return err( `"${ key }" must be a string` )
}
