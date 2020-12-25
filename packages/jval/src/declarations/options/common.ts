import { getBool, getStrOrNull } from './utils'
import { getOptionalConvertOption } from './getConvertOption'
import type { CommonJValueOptions, ConvertOptionType } from './types'

export type CommonJValueOptionsValidated = {
  nullable: boolean,
  optional: boolean,
  rename: null | string,
  convert: null | string | ConvertOptionType,
}

export function getValidCommonJValueOptions(
  opts: CommonJValueOptions,
): never | CommonJValueOptionsValidated {

  return {
    nullable: getBool( opts, 'nullable' ),
    optional: getBool( opts, 'optional' ),
    rename: getStrOrNull( opts, 'rename' ),
    convert: getOptionalConvertOption( opts ),
  }
}
