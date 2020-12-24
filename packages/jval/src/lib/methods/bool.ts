import { isBool } from 'hlp'
import { JBoolean } from '../../declarations'
import { getNullOrOptional } from '../utils'

export {
  get as getBool,
  isValid as isBoolValid,
}


function get( decl: JBoolean, value: unknown ): undefined | null | boolean {
  if ( isValid( decl, value ) ) {
    return value
  }
  const fromDecl = tryCreateValidFromDecl( decl )
  if ( fromDecl !== null ) return fromDecl
  return getNullOrOptional( decl, value )
}


function isValid( decl: JBoolean, value: unknown ): value is boolean {
  return isBool( value )
}


function tryCreateValidFromDecl( decl: JBoolean ): null | boolean {
  if ( isBool( decl.or ) ) return decl.or
  if ( decl.orDefault ) return JBoolean.DEFAULT
  return null
}


