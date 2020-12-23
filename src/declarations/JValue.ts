import { isObj, isStr, jstr } from '../hlp'
import { DeclarationError } from "./error"
import { getBool, getStrOrNull } from './options/utils'
import { getOptionalConvertOption } from './options/getConvertOption'
import type { JValueType } from "./types"
import type { ConvertOptionType, CommonJValueOptions } from './options/types'


export class JValue {
  public static isJValue( some: unknown ): some is JValue {
    return some instanceof JValue
  }

  public readonly jType: JValueType

  public readonly nullable: boolean
  public readonly optional: boolean
  public readonly rename: null | string

  public convert: null | ConvertOptionType = null
  protected readonly convertUnverified: null | string | ConvertOptionType


  constructor( jType: JValueType, optsIn: CommonJValueOptions ) {
    this.jType = jType

    this._checkCtorOptsIsObj( optsIn )

    let opts
    try {
      opts = getValidCommonJValueOptions( optsIn )
    } catch ( e: unknown ) {
      this.throwErr( e )
    }

    this.nullable = opts.nullable
    this.optional = opts.optional
    this.rename = opts.rename
    this.convertUnverified = opts.convert
  }


  private _checkCtorOptsIsObj( opts: CommonJValueOptions ): never | void {
    if ( !isObj( opts ) ) {
      const msg = 'Creating declaration options must be a plain object. '
        + `But actually is ${jstr( opts )}`
      this.throwErr( msg )
    }
  }

  protected throwErr( msg: unknown | string ): never {
    if ( !isStr( msg ) ) throw `Unknown internal error: ${msg}`
    throw new DeclarationError( {
      jType: this.jType,
      declaration: this,
      msg,
    } )
  }
}


type CommonJValueOptionsValidated = {
  nullable: boolean,
  optional: boolean,
  rename: null | string,
  convert: null | string | ConvertOptionType,
}

function getValidCommonJValueOptions(
  opts: CommonJValueOptions,
): never | CommonJValueOptionsValidated {

  return {
    nullable: getBool( opts, 'nullable' ),
    optional: getBool( opts, 'optional' ),
    rename: getStrOrNull( opts, 'rename' ),
    convert: getOptionalConvertOption( opts ),
  }
}
