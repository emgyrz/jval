import { isStr } from 'hlp'
import { JString } from '../../declarations'
import { getNullOrOptional } from '../utils'

export {
  get as getStr,
  isValid as isStrValid,
}


function get( decl: JString, value: unknown ): undefined | null | string {
  if ( isValid( decl, value ) ) {
    return value
  }
  const fromDecl = tryCreateValidFromDecl( decl )
  if ( fromDecl !== null ) return fromDecl
  return getNullOrOptional( decl, value )
}



function isValid( decl: JString, value: unknown ): value is string {
  if ( isStr( value ) ) {
    return isLenValid( decl, value ) && isValidLiteral( decl, value )
  }
  return false
}


function isLenValid( decl: JString, value: string ): boolean {
  const min = decl.minLength
  const max = decl.maxLength

  return !( ( min !== null && value.length < min )
    || ( max !== null && value.length > max ) )
}

function isValidLiteral( decl: JString, value: string ): boolean {
  const lit = decl.literals
  if ( lit === null ) return true
  return lit.includes( value )
}


function tryCreateValidFromDecl( decl: JString ): null | string {
  if ( isStr( decl.or ) ) return decl.or
  if ( decl.orDefault ) return JString.DEFAULT
  return null
}


