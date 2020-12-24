import { JValue } from './JValue'
import { JValueType } from './types'
import { getValidOpts } from './options/obj'
import type { ConvertOptionType, CommonJValueOptions } from './options/types'


export interface JObjectOptions extends CommonJValueOptions {
  props: Record<string, JValue>,
  convert?: ConvertOptionType<Record<string, unknown>>,
}

export class JObject extends JValue {

  public readonly props: Record<string, JValue>

  constructor( optsIn: JObjectOptions ) {
    super( JValueType.Object, optsIn )
    let opts
    try {
      opts = getValidOpts( optsIn )
    } catch ( e: unknown ) {
      this.throwErr( e )
    }

    this.props = opts.props
    this.convert = this.convertUnverified as ConvertOptionType<Record<string, unknown>>
  }
}

export function Obj( opts: JObjectOptions ): JObject {
  return new JObject( opts )
}

