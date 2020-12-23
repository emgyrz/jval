import { isNum } from '../../hlp'
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
    throw `"min" (${ min }) must be less than "max" (${ max })`
  }

  if ( or !== null && orDefault ) {
    throw '"or" and "orDefault" options cannot be set together'
  }

  checkOrDefault( opts )
  checkOr( opts )
}


function checkOrDefault( opts: JNumberVerifiedOptions ): never | void {
  const { min, max, orDefault } = opts
  if ( !orDefault ) return

  if ( min !== null && min > 0 ) {
    throw '"min" is set and is greater than zero.'
    + ' So it conflicts with "orDefault" option which is set to `true`'
    + ' and indicates that the value can be zero'
  }
  if ( max !== null && max < 0 ) {
    throw '"max" is set and is less than zero.'
    + ' So it conflicts with "orDefault" option which is set to `true`'
    + ' and indicates that the value can be zero'
  }
}


function checkOr( opts: JNumberVerifiedOptions ): never | void {
  const { min, max, or } = opts
  if ( !isNum( or ) ) return

  if ( min !== null && or < min ) {
    throw '"or" option value is less than "min"'
  }
  if ( max !== null && or > max ) {
    throw '"or" option value is greater than "max"'
  }
}
