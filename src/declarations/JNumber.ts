import { JValue } from './JValue'
import { JValueType } from './types'
import { isErr } from '../result'
import { getValidOpts } from './options/num'
import type { ConvertOptionType, CommonJValueOptions } from './options'

export type NumberConvertAliases = 'toStr' | 'toDateFromSec' | 'toDateFromMs'

export interface JNumberOptions extends CommonJValueOptions {
  or?: number,
  orDefault?: boolean,
  min?: number,
  max?: number,
  convert?: NumberConvertAliases | ConvertOptionType<number>,
}

export class JNumber extends JValue {
  public static DEFAULT: number = 0

  public readonly or: null | number
  public readonly orDefault: boolean
  public readonly min: null | number
  public readonly max: null | number

  constructor( optsIn: undefined | JNumberOptions = {} ) {
    super( JValueType.Number, optsIn )
    const opts = getValidOpts( optsIn )
    if ( isErr( opts ) ) this.throwErr( opts.error )
    const val = opts.value
    this.or = val.or
    this.orDefault = val.orDefault
    this.min = val.min
    this.max = val.max
    this.convert = val.convert
  }
}

export function Num( opts?: JNumberOptions ): JNumber {
  return new JNumber( opts )
}

