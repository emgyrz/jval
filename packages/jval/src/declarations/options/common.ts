import { isStr } from 'hlp'
import { getBool, getStrOrNull } from './utils'
import { getOptionalConvertOption } from './getConvertOption'
import { getConvertOptFromAlias } from '../predefinedConvertOpt'
import type { CommonJValueOptions, ConvertOptionType } from './types'
import type { JValueType } from '../types'

export type CommonJValueOptionsValidated = {
  nullable: boolean,
  optional: boolean,
  rename: null | string,
  convert: null | ConvertOptionType,
}

export function getValidCommonJValueOptions(
  opts: CommonJValueOptions,
  jType: JValueType,
): never | CommonJValueOptionsValidated {

  return {
    nullable: getBool( opts, 'nullable' ),
    optional: getBool( opts, 'optional' ),
    rename: getStrOrNull( opts, 'rename' ),
    convert: getConvert( opts, jType ),
  }
}


function getConvert( opts: CommonJValueOptions, jType: JValueType ): null | ConvertOptionType {
  const cvt = getOptionalConvertOption( opts )
  if ( cvt === null ) return null
  if ( isStr( cvt ) ) {
    return getConvertOptFromAlias( cvt, jType )
  }
  return cvt
}
