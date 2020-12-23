import { isErr, ok } from "../../result"
import { getOptionalConvertOption } from "./getConvertOption"
import { getBool, getStrOrNull } from "./utils"
import type { Result } from "../../result"
import type{ CommonJValueOptionsValidated, CommonJValueOptions } from "./types"



const DEFAULT: CommonJValueOptionsValidated = {
  nullable: false,
  optional: false,
  rename: null,
  convert: null,
}


export function getValidCommonJValueOptions(
  opts: CommonJValueOptions,
): Result<CommonJValueOptionsValidated, string> {

  const out: CommonJValueOptionsValidated = { ...DEFAULT }

  const nullable = getBool( opts, 'nullable' )
  if ( isErr( nullable ) ) { return nullable } else { out.nullable = nullable.value }

  const optional = getBool( opts, 'optional' )
  if ( isErr( optional ) ) { return optional } else { out.optional = optional.value }

  const rename = getStrOrNull( opts, 'rename' )
  if ( isErr( rename ) ) { return rename } else { out.rename = rename.value }

  const convert = getOptionalConvertOption( opts )
  if ( isErr( convert ) ) { return convert } else { out.convert = convert.value }

  return ok( out )
}


