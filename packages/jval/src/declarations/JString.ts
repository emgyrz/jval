import { JValue } from './JValue'
import { JValueType } from './types'
import { getValidOpts } from './options/str'
import type { ConvertOptionType, CommonJValueOptions } from './options/types'

export type StringConvertAliases = 'toDate' | 'toInt' | 'toFloat'

export interface JStringOptions extends CommonJValueOptions {
  or?: string,
  orDefault?: boolean,
  minLength?: number,
  maxLength?: number,
  literals?: string[],
  convert?: StringConvertAliases | ConvertOptionType<string>,
}

export class JString extends JValue {
  public static DEFAULT: string = ''

  public readonly or: null | string
  public readonly orDefault: boolean
  public readonly minLength: null | number
  public readonly maxLength: null | number
  public readonly literals: null | string[]

  constructor( optsIn: undefined | JStringOptions = {} ) {
    super( JValueType.String, optsIn )
    let opts
    try {
      opts = getValidOpts( optsIn )
    } catch ( e: unknown ) {
      this.throwErr( e )
    }

    this.or = opts.or
    this.orDefault = opts.orDefault
    this.minLength = opts.minLength
    this.maxLength = opts.maxLength
    this.literals = opts.literals
  }
}

export function Str( opts?: JStringOptions ): JString {
  return new JString( opts )
}

