import { err, isErr, ok } from '../../result'
import { getBool, getNumOrNull } from './utils'
import { isStr } from '../../hlp'
import type { JNumberOptions } from '../JNumber'
import type { ConvertOptionType } from './types'
import type { Result } from '../../result'

export type JNumberVerifiedOptions = {
  or: null | number,
  orDefault: boolean,
  min: null | number,
  max: null | number,
  convert: null | ConvertOptionType<number>,
}

export function getValidOpts( opts: JNumberOptions ): Result<JNumberVerifiedOptions, string> {
  const out = getOptsWithValidTypes( opts )
  if ( isErr( out ) ) return out
  const correctnessErr = checkOptsCorrectness( out.value )
  if ( isStr( correctnessErr ) ) return err( correctnessErr )
  return out
}

function getOptsWithValidTypes( opts: JNumberOptions ): Result<JNumberVerifiedOptions, string> {
  const out = genDefVerified()
  const or = getNumOrNull( opts, 'or' )
  if ( isErr( or ) ) { return or } else { out.or = or.value }
  const orDefault = getBool( opts, 'orDefault' )
  if ( isErr( orDefault ) ) { return orDefault } else { out.orDefault = orDefault.value }
  const min = getNumOrNull( opts, 'min' )
  if ( isErr( min ) ) { return min } else { out.min = min.value }
  const max = getNumOrNull( opts, 'max' )
  if ( isErr( max ) ) { return max } else { out.max = max.value }
  return ok( out )
}


function checkOptsCorrectness( opts: JNumberVerifiedOptions ): null | string {
  const { min, max, orDefault, or } = opts
  if ( min !== null && max !== null && min > max ) {
    return `"min" (${min}) must be less than "max" (${max})`
  }

  if ( min !== null && orDefault && min > 0 ) {
    return '"min" is set and is greater than zero.'
      + ' So it conflicts with "orDefault" option which is set to `true`'
      + ' and indicates that the value can be zero'
  }

  if ( or !== null ) {
    if ( min !== null && or < min ) {
      return '"or" option value is less than "min"'
    }
    if ( max !== null && or > max ) {
      return '"or" option value is greater than "max"'
    }
  }

  return null
}

function genDefVerified(): JNumberVerifiedOptions {
  return {
    or: null,
    orDefault: false,
    min: null,
    max: null,
    convert: null,
  }
}
