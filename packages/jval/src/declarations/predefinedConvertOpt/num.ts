import { isValidDate } from 'hlp'
import { Str } from '../JString'
import type { NumberConvertAliases } from '../JNumber'
import type { ConvertOptionType } from '../options/types'

export const numConvertPredefined: Record<NumberConvertAliases, ConvertOptionType<number>> = {
  toStr: {
    returnType: Str(),
    method: ( n: number ): string => String( n ),
  },
  toDateFromMs: toDateConvertOpt( false ),
  toDateFromSec: toDateConvertOpt( true ),
}

function toDateConvertOpt( isFromSec: boolean ): ConvertOptionType<number> {
  return {
    // TODO: create JDate
    returnType: Date,
    method: ( n: number ): null | Date => {
      const ms = isFromSec ? n * 1000 : n
      const d = new Date( ms )
      return isValidDate( d ) ? d : null
    },
  }
}

