import { JArray, Arr } from '../JArray'
import { Str } from '../JString'
import { JValueType } from '../types'
import { DeclarationError } from '../error'
import { JValue } from '../JValue'

describe( 'jArray', () => {
  it( 'defaults', () => {
    const arr = Arr( { item: Str() } )
    expect( arr.jType ).toBe( JValueType.Array )
    expect( arr.jType ).toBe( 'Array' )
    expect( arr.or ).toBeNull()
    expect( arr.orDefault ).toBe( false )
    expect( arr.item.jType ).toBe( JValueType.String )
  } )

  it( 'invalid opts', () => {
    const invalidOpts = [
      {},
      { item: 1 },
      { notEmpty: {} },
      { skipNonValid: 'bar' },
      { convert: (): void => { return } },
    ]
    invalidOpts.forEach( ( opts ) => {
      expect( () => {
        // @ts-ignore
        new JArray( opts )
      } ).toThrow( DeclarationError )
    } )
  } )

  it( 'conflicting opts', () => {
    const conflictingOpts = [
      { item: Str(), orDefault: true, notEmpty: true },
      { item: Str(), orDefault: true, or: (): Array<unknown> => [] },

    ]
    conflictingOpts.forEach( ( opts ) => {
      expect( () => {
        new JArray( opts )
      } ).toThrow( DeclarationError )
    } )
  } )

  it( 'valid opts', () => {
    const decl = new JArray( {
      item: Str(),
      or: (): Array<unknown> => [],
      notEmpty: true,
      convert: {
        returnType: Str(),
        method: ( arr: Array<unknown> ): string => arr[ 0 ] as string,
      },
    } )
    expect( decl.or ? decl.or() : null ).toStrictEqual( [] )
    expect( decl.optional ).toBe( false )
    expect( decl.nullable ).toBe( false )
    expect( decl.convert?.method( [ 'foo' ] ) ).toBe( 'foo' )
    expect( JValue.isJValue( decl.item ) ).toBe( true )
  } )

} )
