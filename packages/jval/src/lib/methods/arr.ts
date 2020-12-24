import { isF } from 'hlp'
import { JArray } from '../../declarations'
import { getNullOrOptional } from '../utils'
import { convert } from './convert'
import { isValueValid } from '../index'
import type { JValue } from '../../declarations'

export {
  get as getArr,
  isValidWithItems as isArrValid,
}


function get( decl: JArray, value: unknown ): undefined | null | Array<unknown> {
  if ( isValidSimple( decl, value ) ) {
    const filled = getFilledArr( decl, value )
    const mustHaveItemsButDoesNot = decl.notEmpty && filled.length === 0
    if ( !mustHaveItemsButDoesNot ) {
      return getFilledArr( decl, value )
    }
  }
  const fromDecl = tryCreateValidFromDecl( decl )
  if ( fromDecl !== null ) return fromDecl
  return getNullOrOptional( decl, value )
}


function isValidSimple( decl: JArray, value: unknown ): value is Array<unknown> {
  return Array.isArray( value )
}


function getFilledArr( decl: JArray, arr: Array<unknown> ): Array<unknown> {
  if ( decl.skipNonValid ) {
    return getFilledArrSkippingInvalid( decl, arr )
  }
  return getFilledArrThrowingOnInvalid( decl, arr )
}



function getFilledArrSkippingInvalid( decl: JArray, arr: Array<unknown> ): Array<unknown> {
  const itemDecl = decl.item
  return mapFiltered( decl, arr, ( arrItem: unknown ) => {
    try {
      return convert( itemDecl, arrItem )
    } catch ( e: unknown ) {
      return undefined
    }
  } )
}


function getFilledArrThrowingOnInvalid( decl: JArray, arr: Array<unknown> ): Array<unknown> {
  const itemDecl = decl.item
  return mapFiltered( decl, arr, ( arrItem: unknown ) => convert( itemDecl, arrItem ) )
}


type Cb = ( arrItem: unknown ) => undefined | unknown

function mapFiltered( decl: JArray, arr: Array<unknown>, cb: Cb ): Array<unknown> {
  const result: Array<unknown> = []
  for ( let i = 0; i < arr.length; i++ ) {
    const item = arr[ i ]
    const mapped = cb( item )
    if ( mapped !== undefined ) {
      result.push( cb( item ) )
    }
  }
  return result
}


function isValidWithItems( decl: JArray, value: unknown ): value is Array<unknown> {
  if ( isValidSimple( decl, value ) ) {
    return isItemsValid( decl.item, value )
  }
  return false
}


function isItemsValid( itemDecl: JValue, items: Array<unknown> ): boolean {
  for ( let i = 0; i < items.length; i++ ) {
    const item = items[ i ]
    const isValid = isValueValid( itemDecl, item )
    if ( !isValid ) return false
  }
  return true
}


function tryCreateValidFromDecl( decl: JArray ): null | Array<unknown> {
  if ( isF( decl.or ) ) return decl.or()
  if ( decl.orDefault ) return JArray.DEFAULT()
  return null
}

