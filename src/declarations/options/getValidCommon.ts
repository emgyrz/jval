import { getOptionalConvertOption } from "./getConvertOption"
import { getBool, getStrOrNull } from "./utils"
import type{ CommonJValueOptionsValidated, CommonJValueOptions } from "./types"

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


