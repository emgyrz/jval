import { JValue } from '../declarations'
import { isValid } from './isValid'
import { convert } from './convert'
import { JvalError } from './error'


export function isValueValid( decl: JValue, value: unknown ): never | boolean {
  if ( !JValue.isJValue( decl ) ) {
    throw new JvalError( { decl: null, val: decl, msg: '' } )
  }
  return isValid( decl, value )
}

export function convertValue( decl: JValue, value: unknown ): never | null | undefined | unknown {
  if ( !JValue.isJValue( decl ) ) {
    throw new JvalError( { decl: null, val: decl, msg: '' } )
  }

  try {
    return convert( decl, value )
  } catch ( e: unknown ) {
    throw new JvalError( { decl, val: value, msg: String( e ) } )
  }
}

export function convertJsonValue( decl: JValue, jsonStr: string ): never | null | undefined | unknown {
  let dataIn

  try {
    dataIn = JSON.parse( jsonStr )
  } catch ( e: unknown ) {
    throw new JvalError( { decl, val: jsonStr, msg: 'cannot parse passed JSON string' } )
  }

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
