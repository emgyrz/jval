import { isNil, isStr } from 'hlp'
import { getBool, getStrOrNull, getUintOrNull } from './utils'
import type { JStringOptions } from '../JString'
import type { ConvertOptionType } from './types'

export type JStringVerifiedOptions = {
  or: null | string,
  orDefault: boolean,
  minLength: null | number,
  maxLength: null | number,
  literals: null | string[],
  convert: null | ConvertOptionType<number>,
}

export function getValidOpts( optsIn: JStringOptions ): never | JStringVerifiedOptions {
  const opts = getOptsWithValidTypes( optsIn )
  checkOptsCorrectness( opts )
  return opts
}

function getOptsWithValidTypes( opts: JStringOptions ): never | JStringVerifiedOptions {
  return {
    or: getStrOrNull( opts, 'or' ),
    orDefault: getBool( opts, 'orDefault' ),
    minLength: getUintOrNull( opts, 'minLength' ),
    maxLength: getUintOrNull( opts, 'maxLength' ),
    literals: getLiterals( opts ),
    // TODO:
    convert: null,
  }
}


const _LITERALS_ERR_MSG = 'property "literals" must be not empty array of unique strings'
function getLiterals( opts: JStringOptions ): never | null | string[] {
  const litIn = opts.literals
  if ( isNil( litIn ) ) return null
  if ( Array.isArray( litIn ) && litIn.length !== 0 ) {
    const lit: string[] = []
    for ( let i = 0; i < litIn.length; i++ ) {
      const litVal = litIn[ i ]
      if ( isStr( litVal ) ) {
        lit.push( litVal )
      } else {
        throw _LITERALS_ERR_MSG
      }
    }
    return lit
  }
  throw _LITERALS_ERR_MSG
}


function checkOptsCorrectness( opts: JStringVerifiedOptions ): never | void {
  const { minLength, maxLength, orDefault, or } = opts
  if ( minLength !== null && maxLength !== null && minLength > maxLength ) {
    throw `"minLength" (${ minLength }) must be less than "maxLength" (${ maxLength })`
  }

  if ( or !== null && orDefault ) {
    throw '"or" and "orDefault" options cannot be set together'
  }

  checkOrDefault( opts )
  checkOr( opts )
  checkLiterals( opts )
}

function checkOrDefault( opts: JStringVerifiedOptions ): never | void {
  const { minLength, orDefault } = opts
  if ( !orDefault ) return

  if ( minLength !== null && minLength > 0 ) {
    throw '"minLength" is set and is greater than zero.'
    + ' So it conflicts with "orDefault" option which is set to `true`'
    + ' and indicates that the value can be zero'
  }
}


function checkOr( opts: JStringVerifiedOptions ): never | void {
  const { minLength, maxLength, or } = opts
  if ( !isStr( or ) ) return
  const orLen = or.length
  if ( minLength !== null && orLen < minLength ) {
    throw '"or" option value length is less than "minLength"'
  }
  if ( maxLength !== null && orLen > maxLength ) {
    throw '"or" option value length is greater than "maxLength"'
  }
}


function checkLiterals( opts: JStringVerifiedOptions ): never | void {
  const { literals } = opts
  if ( literals === null ) return

  const minLen = opts.minLength ?? 0
  const maxLen = opts.maxLength ?? Infinity
  const verified: Record<string, boolean> = {}

  for ( let i = 0; i < literals.length; i++ ) {
    const lit = literals[ i ]

    if ( verified[ lit ] ) { throw `duplicated literals "${lit}"` }

    const litLen = lit.length

    if ( litLen < minLen ) {
      throw `length of literal "${lit}" is less than "minLength" (${minLen})`
    }
    if ( litLen > maxLen ) {
      throw `length of literal "${lit}" is greater than "maxLength" (${maxLen})`
    }
    verified[ lit ] = true
  }
}


