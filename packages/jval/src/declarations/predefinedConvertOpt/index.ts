import { isNil } from 'hlp'
import { JValueType } from '../types'
import { numConvertPredefined } from './num'
import { strConvertPredefined } from './str'
import type { ConvertOptionType } from '../options/types'


export function getConvertOptFromAlias( alias: string, jType: JValueType ): ConvertOptionType {
  switch ( jType ) {
    case JValueType.Object:
    case JValueType.Array:
    case JValueType.Boolean:
      throw 'this type of declaration has no convert aliases.'
      + ` So that, "${alias}" is invalid`

    case JValueType.Number:
      return getNumConvertFromAlias( alias )
    case JValueType.String:
      return getStrConvertFromAlias( alias )
  }
}

function getNumConvertFromAlias( alias: string ): ConvertOptionType<number> {
  return pick<number>( numConvertPredefined, alias )
}

function getStrConvertFromAlias( alias: string ): ConvertOptionType<string> {
  return pick<string>( strConvertPredefined, alias )
}


function pick<T>(
  available: Record<string, ConvertOptionType<T>>,
  name: string,
): ConvertOptionType<T> {
  const cvt = available[ name ]
  if ( isNil( cvt ) ) {
    const aliasesList = Object.keys( available ).join( ', ' )
    throw `"convert" option "${name}" not found.`
      + ` Available aliases are ${aliasesList}`
  }
  return cvt
}

