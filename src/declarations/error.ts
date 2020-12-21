import { JValueType } from "./types"
import { JValue } from "./JValue"

export interface DeclarationErrorCtorArg {
  jType: JValueType,
  declaration: JValue,
  msg: string,
}

export class DeclarationError extends Error {
  public jType: JValueType
  public declaration: JValue

  constructor( arg: DeclarationErrorCtorArg ) {
    super()
    this.jType = arg.jType
    this.declaration = arg.declaration
    this.message = wrapMsg( arg.jType, arg.msg )
    this.name = 'DeclarationError'
    this.stack = ( new Error() ).stack
  }
}


function wrapMsg( jType: JValueType, msg: string ): string {
  return `Error when declaring value ${jType}: ${msg}`
}
