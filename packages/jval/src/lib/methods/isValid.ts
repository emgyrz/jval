import { JValueType } from '../../declarations'
import type { JArray, JBoolean, JNumber, JObject, JString, JValue } from '../../declarations'

import { isBoolValid } from './bool'
import { isNumValid } from './num'
import { isStrValid } from './str'
import { isObjValid } from './obj'
import { isArrValid } from './arr'

export function isValid( decl: JValue, value: unknown ): boolean {
  switch ( decl.jType ) {
    case JValueType.Boolean: { return isBoolValid( decl as JBoolean, value ) }
    case JValueType.Number: { return isNumValid( decl as JNumber, value ) }
    case JValueType.String: { return isStrValid( decl as JString, value ) }
    case JValueType.Object: { return isObjValid( decl as JObject, value ) }
    case JValueType.Array: { return isArrValid( decl as JArray, value ) }
    // TODO:
    default: { throw 'invalid jType error' }
  }
}

