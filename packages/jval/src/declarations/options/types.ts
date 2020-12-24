import type { JValue } from "../JValue"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ConvertOptionType<T = any, R = unknown> = {
  readonly returnType: JValue | typeof Date,
  readonly method: ( item: T ) => R,
}


export interface CommonJValueOptions extends Record<string, unknown> {
  nullable?: boolean,
  optional?: boolean,
  rename?: string,
  convert?: string | ConvertOptionType,
}
