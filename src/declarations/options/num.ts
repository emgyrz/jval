import { getBool, getNumOrNull } from './utils'
import type { JNumberOptions } from '../JNumber'
import type { ConvertOptionType } from './types'

export type JNumberVerifiedOptions = {
  or: null | number,
  orDefault: boolean,
  min: null | number,
  max: null | number,
  convert: null | ConvertOptionType<number>,
}

export function getValidOpts( optsIn: JNumberOptions ): never | JNumberVerifiedOptions {
  const opts = getOptsWithValidTypes( optsIn )
  checkOptsCorrectness( opts )
  return opts
}

function getOptsWithValidTypes( opts: JNumberOptions ): never | JNumberVerifiedOptions {
  return {
    or: getNumOrNull( opts, 'or' ),
    orDefault: getBool( opts, 'orDefault' ),
    min: getNumOrNull( opts, 'min' ),
    max: getNumOrNull( opts, 'max' ),
    // TODO:
    convert: null,
  }
}


function checkOptsCorrectness( opts: JNumberVerifiedOptions ): never | void {
  const { min, max, orDefault, or } = opts
  if ( min !== null && max !== null && min > max ) {
    throw `"min" (${min}) must be less than "max" (${max})`
  }

  if ( min !== null && orDefault && min > 0 ) {
    throw '"min" is set and is greater than zero.'
      + ' So it conflicts with "orDefault" option which is set to `true`'
      + ' and indicates that the value can be zero'
  }

  if ( or !== null ) {
    if ( min !== null && or < min ) {
      throw '"or" option value is less than "min"'
    }
    if ( max !== null && or > max ) {
      throw '"or" option value is greater than "max"'
    }
  }
}
