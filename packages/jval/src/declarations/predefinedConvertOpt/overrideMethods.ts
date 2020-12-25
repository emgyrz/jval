import { isNil, isStr } from 'hlp'
import { JString } from '../JString'
import { JNumber } from '../JNumber'
import { strConvertPredefined } from './str'
import { numConvertPredefined } from './num'
import type { JValue } from '../JValue'
import type { ConvertOptionType } from '../options/types'

JString.prototype[ '_getConvertOption' ] = overriddenGetConvertOption<string>( strConvertPredefined )
JNumber.prototype[ '_getConvertOption' ] = overriddenGetConvertOption<number>( numConvertPredefined )

export const __isGetConvertOptsOverridden = true

type GetConvertOptMethod<T> = (
  cvtUnverified: null | string | ConvertOptionType,
) => never | null | ConvertOptionType<T>


function overriddenGetConvertOption<T>(
  predefinedConvertOpts: Record<string, ConvertOptionType<T>>,
): GetConvertOptMethod<T> {
  return function (
    this: JValue, cvtUnverified: null | string | ConvertOptionType,
  ): never | null | ConvertOptionType<T> {
    if ( !isStr( cvtUnverified ) ) return cvtUnverified

    try {
      return getConvertOptionFromAlias<T>( predefinedConvertOpts, cvtUnverified )
    } catch ( e: unknown ) {
      this.throwErr( e )
    }
  }
}


function getConvertOptionFromAlias<T>(
  available: Record<string, ConvertOptionType<T>>,
  name: string,
): ConvertOptionType<T> {
  const cvt = available[ name ]
  if ( isNil( cvt ) ) {
    const aliasesList = Object.keys( available ).join( ', ' )
    throw `"convert" option "${ name }" not found.`
    + ` Available aliases are ${ aliasesList }`
  }
  return cvt
}
