import { isFloat, isInt, isValidDate } from 'hlp'
import { Num } from '../JNumber'
import type { StringConvertAliases } from '../JString'
import type { ConvertOptionType } from '../options/types'

export const strConvertPredefined: Record<StringConvertAliases, ConvertOptionType<string>> = {
  toInt: Object.freeze( {
    returnType: Num(),
    method: ( s: string ): null | number => {
      const n = parseInt( s )
      return isInt( n ) ? n : null
    },
  } ),
  toFloat: {
    returnType: Num(),
    method: ( s: string ): null | number => {
      const n = parseFloat( s )
      return isFloat( n ) ? n : null
    },
  },
  toDate: {
    returnType: Date,
    method: ( s: string ): null | Date => {
      const d = new Date( s )
      return isValidDate( d ) ? d : null
    },
  },
}

