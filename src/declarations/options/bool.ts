import { getBool, getBoolOrNull } from './utils'
import type { JBooleanOptions } from '../JBoolean'

export type JBooleanVerifiedOptions = {
  or: null | boolean,
  orDefault: boolean,
}

export function getValidOpts( optsIn: JBooleanOptions ): never | JBooleanVerifiedOptions {
  const opts = getOptsWithValidTypes( optsIn )
  checkOptsCorrectness( opts )
  return opts
}

function getOptsWithValidTypes( opts: JBooleanOptions ): never | JBooleanVerifiedOptions {
  return {
    or: getBoolOrNull( opts, 'or' ),
    orDefault: getBool( opts, 'orDefault' ),
  }
}


function checkOptsCorrectness( opts: JBooleanVerifiedOptions ): never | void {
  const { orDefault, or } = opts

  if ( or !== null && orDefault ) {
    throw '"or" and "orDefault" options cannot be set together'
  }
}

