import { JValue } from './JValue'
import { JValueType } from './types'
import { getValidOpts } from './options/bool'
import type { ConvertOptionType, CommonJValueOptions } from './options/types'

export interface JBooleanOptions extends CommonJValueOptions {
  or?: boolean,
  orDefault?: boolean,
  convert?: ConvertOptionType<boolean>,
}

export class JBoolean extends JValue {
  public static DEFAULT: boolean = false

  public readonly or: null | boolean
  public readonly orDefault: boolean

  constructor( optsIn: undefined | JBooleanOptions = {} ) {
    super( JValueType.Boolean, optsIn )
    let opts
    try {
      opts = getValidOpts( optsIn )
    } catch ( e: unknown ) {
      this.throwErr( e )
    }

    this.or = opts.or
    this.orDefault = opts.orDefault
  }
}

export function Bool( opts?: JBooleanOptions ): JBoolean {
  return new JBoolean( opts )
}

