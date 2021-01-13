import { DeclarationError, JString, Str } from '../../../declarations'
import { getStr, isStrValid } from '../str'
import { JvalError } from '../../error'

describe( 'string converter', () => {
  it( 'should validate string no opts', () => {
    const decl = Str()
    expect( isStrValid( decl, '' ) ).toBe( true )
    expect( isStrValid( decl, 1 ) ).toBe( false )
  } )

  it( 'should validate string with length', () => {
    const decl = Str( { minLength: 2, maxLength: 4 } )
    expect( isStrValid( decl, 'foo' ) ).toBe( true )
    expect( isStrValid( decl, 'f' ) ).toBe( false )
    expect( isStrValid( decl, 'foobar' ) ).toBe( false )
  } )

  it( 'should validate literals', () => {
    const decl = Str( { literals: [ 'foo', 'bar' ] } )
    expect( isStrValid( decl, 'foo' ) ).toBe( true )
    expect( isStrValid( decl, 'f' ) ).toBe( false )
  } )


  it( 'should convert string with or', () => {
    const or = 'foo'
    const declOr = Str( { or } )
    expect( getStr( declOr, [] ) ).toBe( or )
    expect( getStr( declOr, 1 ) ).toBe( or )

    const declOrDef = Str( { orDefault: true } )
    expect( getStr( declOrDef, [] ) ).toBe( JString.DEFAULT )
    expect( getStr( declOrDef, 1 ) ).toBe( JString.DEFAULT )

    expect( () => {
      Str( { or, maxLength: 2, nullable: true } )
    } ).toThrow( DeclarationError )
  } )

  it( 'should convert string nullable', () => {
    const declWithMinNullable = Str( { nullable: true, minLength: 2 } )
    expect( getStr( declWithMinNullable, [] ) ).toBeNull()
    expect( getStr( declWithMinNullable, 1 ) ).toBeNull()
    expect( getStr( declWithMinNullable, 'f' ) ).toBeNull()
    expect( getStr( declWithMinNullable, 'foo' ) ).toBe( 'foo' )
  } )

  it( 'should convert string optional', () => {
    const declWithMaxOptional = Str( { optional: true, maxLength: 2 } )
    expect( getStr( declWithMaxOptional, [] ) ).toBeUndefined()
    expect( getStr( declWithMaxOptional, 1 ) ).toBeUndefined()
    expect( getStr( declWithMaxOptional, 'foo' ) ).toBeUndefined()
    expect( getStr( declWithMaxOptional, 'f' ) ).toBe( 'f' )
  } )

  it( 'should throw on invalid convert string', () => {
    function testThrowing( val: unknown, decl: JString ): void {
      expect( () => {
        getStr( decl, val )
        // eslint-disable-next-line jest/require-to-throw-message
      } ).toThrow()
    }

    testThrowing( 'foo', Str( { maxLength: 2 } ) )
    testThrowing( 'foo', Str( { minLength: 5 } ) )
    testThrowing( [], Str() )
    testThrowing( {}, Str() )
  } )

} )
