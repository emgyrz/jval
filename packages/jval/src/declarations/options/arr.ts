import { isF, isNil, jstr } from 'hlp'
import { JValue } from '../JValue'
import { getBool } from './utils'
import type { JArrayOptions } from '../JArray'

export type JArrayVerifiedOptions = {
  item: JValue,
  or: null | ( () => Array<unknown> ),
  orDefault: boolean,
  notEmpty: boolean,
  skipNonValid: boolean,
}

export function getValidOpts( optsIn: JArrayOptions ): never | JArrayVerifiedOptions {
  const opts = getOptsWithValidTypes( optsIn )
  checkOptsCorrectness( opts )
  return opts
}

function getOptsWithValidTypes( opts: JArrayOptions ): never | JArrayVerifiedOptions {
  return {
    item: getItem( opts ),
    or: getOr( opts ),
    orDefault: getBool( opts, 'orDefault' ),
    notEmpty: getBool( opts, 'notEmpty' ),
    skipNonValid: getBool( opts, 'skipNonValid' ),
  }
}

function getItem( opts: JArrayOptions ): never | JValue {
  const { item } = opts
  if ( isNil( item ) ) throw '"item" option is required'

  if ( !JValue.isJValue( item ) ) {
    throw '"item" option must be extends JValue,'
    + ' i.e. be, for example, a JString or a JNumber.'
    + ` But it is ${jstr( item )}`
  }

  return item
}

function getOr( opts: JArrayOptions ): never | null | ( () => Array<unknown> ) {
  const fn = opts.or
  if ( isNil( fn ) ) return null
  if ( !isF( fn ) || !Array.isArray( fn() ) ) {
    throw '"or" option must be a pure function that returns array'
  }
  return fn
}

function checkOptsCorrectness( opts: JArrayVerifiedOptions ): never | void {
  const { notEmpty, orDefault, or } = opts

  if ( or !== null && orDefault ) {
    throw '"or" and "orDefault" options cannot be set together'
  }
  if ( notEmpty && orDefault ) {
    throw '"notEmpty" and "orDefault" options cannot be set together'
  }
}
