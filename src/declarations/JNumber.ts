import { JValue } from './JValue'
import { JValueType } from './types'
import { getValidOpts } from './options/num'
import type { ConvertOptionType, CommonJValueOptions } from './options/types'

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
    let opts
    try {
      opts = getValidOpts( optsIn )
    } catch ( e: unknown ) {
      this.throwErr( e )
    }

    this.or = opts.or
    this.orDefault = opts.orDefault
    this.min = opts.min
    this.max = opts.max
    this.convert = opts.convert
  }
}

export function Num( opts?: JNumberOptions ): JNumber {
  return new JNumber( opts )
}

