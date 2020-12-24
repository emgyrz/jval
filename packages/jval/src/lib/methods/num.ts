import { isNum } from 'hlp'
import { JNumber } from '../../declarations'
import { getNullOrOptional } from '../utils'

export {
  get as getNum,
  isValid as isNumValid,
}

function get( decl: JNumber, value: unknown ): undefined | null | number {
  if ( isValid( decl, value ) ) {
    return value
  }
  const fromDecl = tryCreateValidFromDecl( decl )
  if ( fromDecl !== null ) return fromDecl
  return getNullOrOptional( decl, value )
}


function isValid( decl: JNumber, value: unknown ): value is number {
  if ( isNum( value ) ) {
    return isWithin( decl, value )
  }
  return false
}


function isWithin( decl: JNumber, num: number ): boolean {
  const { min, max } = decl
  return !( ( min !== null && num < min )
    || ( max !== null && num > max ) )
}

function tryCreateValidFromDecl( decl: JNumber ): null | number {
  if ( isNum( decl.or ) ) return decl.or
  if ( decl.orDefault ) return JNumber.DEFAULT
  return null
}


