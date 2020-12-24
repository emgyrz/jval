import type { JValue } from '../declarations'


export function getNullOrOptional( decl: JValue, value: unknown ): null | undefined {
  if ( decl.nullable ) return null
  if ( decl.optional ) return undefined
  // console.trace()
  throw new Error( `cannot convert value ${JSON.stringify( value )} to ${decl.jType}` )
}

