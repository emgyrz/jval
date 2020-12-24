import { JValue, JValueType } from '../../declarations'
import type { JArray, JBoolean, JNumber, JObject, JString } from '../../declarations'

import { getBool } from './bool'
import { getArr } from './arr'
import { getNum } from './num'
import { getObj } from './obj'
import { getStr } from './str'

export function convert( decl: JValue, value: unknown ): never | null | undefined | unknown {
  const val = get( decl, value )
  if ( decl.convert !== null && val !== null && val !== undefined ) {
    const rt = decl.convert.returnType
    if ( JValue.isJValue( rt ) ) {
      return convert( rt, decl.convert.method( val ) )
      // FIXME: add JDate
    } else if ( rt === Date ) {
      return decl.convert.method( val )
    }
  }
  return val
}


function get( decl: JValue, value: unknown ): null | undefined | unknown {
  switch ( decl.jType ) {
    case JValueType.Boolean: { return getBool( decl as JBoolean, value ) }
    case JValueType.Number: { return getNum( decl as JNumber, value ) }
    case JValueType.String: { return getStr( decl as JString, value ) }
    case JValueType.Object: { return getObj( decl as JObject, value ) }
    case JValueType.Array: { return getArr( decl as JArray, value ) }
    // TODO:
    default: { throw 'invalid jType error' }
  }
}
