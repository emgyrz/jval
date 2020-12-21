import { isObj, jstr } from '../hlp'
import { JValueType } from "./types"

import type {
  CommonJValueOptionsValidated,
  ConvertOptionType,
  CommonJValueOptions,
} from './options'
import { DeclarationError } from "./error"
import {
  getValidCommonJValueOptions,
} from "./options"
import { isErr } from "../result"


export class JValue {
  public static isJValue( some: unknown ): some is JValue {
    if ( !some ) return false
    return some instanceof JValue
    // // @ts-ignore
    // return Object.keys( JValueType ).includes( some.jType )
  }

  public readonly jType: JValueType

  public readonly nullable: boolean
  public readonly optional: boolean
  public readonly rename: null | string

  public readonly convert: null | ConvertOptionType = null
  protected readonly convertUnverified: null | string | ConvertOptionType


  constructor( jType: JValueType, optsIn: CommonJValueOptions ) {
    this.jType = jType

    this._checkCtorOptsIsObj( optsIn )

    const opts = this._getValidOpts( optsIn )

    this.nullable = opts.nullable
    this.optional = opts.optional
    this.rename = opts.rename
    this.convertUnverified = opts.convert
  }


  private _checkCtorOptsIsObj( opts: CommonJValueOptions ): void | never {
    if ( !isObj( opts ) ) {
      const msg = 'Creating declaration options must be a plain object. '
        + `But actually is ${jstr( opts )}`
      this.throwErr( msg )
    }
  }


  private _getValidOpts( opts: CommonJValueOptions ): never | CommonJValueOptionsValidated {
    const validOptsResult = getValidCommonJValueOptions( opts )
    if ( isErr( validOptsResult ) ) {
      this.throwErr( validOptsResult.error )
    }
    return validOptsResult.value
  }


  protected throwErr( msg: string ): never {
    throw new DeclarationError( {
      jType: this.jType,
      declaration: this,
      msg,
    } )
  }
}
