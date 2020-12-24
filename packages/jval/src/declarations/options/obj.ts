import { isNil, isObj, jstr } from 'hlp'
import { JValue } from '../JValue'
import type { JObjectOptions } from '../JObject'

export type JObjectVerifiedOptions = {
  props: Record<string, JValue>,
}

export function getValidOpts( optsIn: JObjectOptions ): never | JObjectVerifiedOptions {
  return getOptsWithValidTypes( optsIn )
}

function getOptsWithValidTypes( opts: JObjectOptions ): never | JObjectVerifiedOptions {
  return {
    props: getProps( opts ),
  }
}

const _PROPS_ERR_MSG = '"props" property must be a plain object which contains only JValue in own values'

function getProps( opts: JObjectOptions ): never | Record<string, JValue> {
  const propsIn: unknown | Record<string, unknown | JValue> = opts.props

  if ( isNil( propsIn ) ) throw '"props" property is required'
  if ( !isObj( propsIn ) ) {
    throw _PROPS_ERR_MSG
  }

  const result: Record<string, JValue> = {}
  const keys = Object.keys( propsIn )
  for ( let i = 0; i < keys.length; i++ ) {
    const key = keys[ i ]
    const val = propsIn[ key ]
    if ( !JValue.isJValue( val ) ) {
      throw _PROPS_ERR_MSG
      + ` But "${ key }" is ${ jstr( val ) }`
    } else {
      result[ key ] = val
    }
  }
  return result
}
