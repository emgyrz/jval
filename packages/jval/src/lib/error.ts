import { jstr } from 'hlp'
import type { JValue } from ".."

export interface JValErrorCtorArg {
  decl: null | JValue,
  val: unknown,
  msg: string,
}

export class JvalError extends Error {
  public declaration: null | JValue
  public value: unknown

  constructor( arg: JValErrorCtorArg ) {
    super()
    this.declaration = arg.decl
    this.value = arg.val
    this.message = genMsg( arg )
    this.name = 'JValError'
    this.stack = ( new Error() ).stack
  }
}

function genMsg( params: JValErrorCtorArg ): string {
  if ( params.decl === null ) {
    return `${jstr( params.val )} is not valid JValue declaration`
  }

  return `Error when handling J${params.decl.jType} with value ${jstr( params.val )}: ${params.msg}`
}
