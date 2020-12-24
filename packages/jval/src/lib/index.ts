import { jstr } from 'hlp'
import { JValue } from '../declarations'
import { isValid } from './isValid'
import { convert } from './convert'


export function isValueValid( decl: JValue, value: unknown ): boolean {
  return isValid( decl, value )
}

export function convertValue( decl: JValue, value: unknown ): never | null | undefined | unknown {
  if ( !JValue.isJValue( decl ) ) {
    // TODO: err
    throw `${jstr( decl )} is not a valid declaration`
  }

  // TODO: wrap with try/catch and error
  return convert( decl, value )
}

export function convertJsonValue( decl: JValue, jsonStr: string ): never | null | undefined | unknown {
  // TODO: handle SyntaxError
  const dataIn = JSON.parse( jsonStr )

  return convertValue( decl, dataIn )
}

export function convertValueOrNull( decl: JValue, value: unknown ): null | undefined | unknown {
  try {
    return convertValue( decl, value )
  } catch ( e: unknown ) {
    return null
  }
}

export function convertJsonValueOrNull( decl: JValue, value: string ): null | undefined | unknown {
  try {
    return convertJsonValue( decl, value )
  } catch ( e: unknown ) {
    return null
  }
}
