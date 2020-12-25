export { JValueType } from './types'
export { JValue } from './JValue'

export type { ConvertOptionType, CommonJValueOptions } from './options/types'

export { DeclarationError } from './error'
export type { DeclarationErrorCtorArg } from './error'

export { JBoolean, Bool } from './JBoolean'
export type { JBooleanOptions } from './JBoolean'

export { JNumber, Num } from './JNumber'
export type { JNumberOptions, NumberConvertAliases } from './JNumber'

export { JString, Str } from './JString'
export type { JStringOptions, StringConvertAliases } from './JString'

export { JObject, Obj } from './JObject'
export type { JObjectOptions } from './JObject'

export { JArray, Arr } from './JArray'
export type { JArrayOptions } from './JArray'

/**
 * this is here because in other places it breaks tests due to circular dependencies
 *
 * the reason this useless variable is exported
 * is because rollup otherwise removes all code from file
 * when uses tree-shaking
 */
export { __isGetConvertOptsOverridden } from './predefinedConvertOpt/overrideMethods'
