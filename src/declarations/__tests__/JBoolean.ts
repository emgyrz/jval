import { JBoolean, Bool } from '../JBoolean'
import { JValueType } from '../types'
import { DeclarationError } from '../error'
import { Num } from '../JNumber'

describe( 'jNumber', () => {
  it( 'defaults', () => {
    const num = Bool()
    expect( num.jType ).toBe( JValueType.Boolean )
    expect( num.jType ).toBe( 'Boolean' )
    expect( num.nullable ).toBe( false )
    expect( num.optional ).toBe( false )
    expect( num.or ).toBeNull()
    expect( num.orDefault ).toBe( false )
  } )

  it( 'invalid opts', () => {
    const invalidOpts = [
      { or: '' },
      { orDefault: [] },
      { convert: (): void => { return } },
    ]
    invalidOpts.forEach( ( opts ) => {
      expect( () => {
        // @ts-ignore
        new JBoolean( opts )
      } ).toThrow( DeclarationError )
    } )
  } )

  it( 'conflicting opts', () => {
    const conflictingOpts = [
      { orDefault: true, or: false },
    ]
    conflictingOpts.forEach( ( opts ) => {
      expect( () => {
        new JBoolean( opts )
      } ).toThrow( DeclarationError )
    } )
  } )

  it( 'valid opts', () => {
    const decl = new JBoolean( {
      or: true,
      convert: {
        returnType: Num(),
        method: ( bool: boolean ): number => bool ? 1 : 0,
      },
    } )
    expect( decl.or ).toBe( true )
    // @ts-ignore
    const method: CallableFunction = decl.convert?.method
    expect( method( true ) ).toBe( 1 )
    expect( method( false ) ).toBe( 0 )
  } )

} )
