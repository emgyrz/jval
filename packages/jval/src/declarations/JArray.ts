import { JValue } from './JValue'
import { JValueType } from './types'
import { getValidOpts } from './options/arr'
import type { ConvertOptionType, CommonJValueOptions } from './options/types'


export interface JArrayOptions extends CommonJValueOptions {
  item: JValue,
  or?: () => Array<unknown>,
  orDefault?: boolean,
  notEmpty?: boolean,
  skipNonValid?: boolean,
  convert?: ConvertOptionType<Array<unknown>>,
}

export class JArray extends JValue {
  public static DEFAULT = (): Array<unknown> => []

  public readonly item: JValue

  public readonly or: null | ( () => Array<unknown> )
  public readonly orDefault: boolean
  public readonly notEmpty: boolean
  public readonly skipNonValid: boolean

  constructor( optsIn: JArrayOptions ) {
    super( JValueType.Array, optsIn )
    let opts
    try {
      opts = getValidOpts( optsIn )
    } catch ( e: unknown ) {
      this.throwErr( e )
    }

    this.item = opts.item
    this.or = opts.or
    this.orDefault = opts.orDefault
    this.notEmpty = opts.notEmpty
    this.skipNonValid = opts.skipNonValid
    this.convert = this.convertUnverified as ConvertOptionType<Array<unknown>>
  }
}

export function Arr( opts: JArrayOptions ): JArray {
  return new JArray( opts )
}

