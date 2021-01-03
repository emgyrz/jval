import { Bool, JBoolean } from '../../../declarations'
import { getBool, isBoolValid } from '../bool'

describe( 'boolean converter', () => {
  it( 'should validate boolean', () => {
    const decl = Bool()
    expect( isBoolValid( decl, '' ) ).toBe( false )
    expect( isBoolValid( decl, 1 ) ).toBe( false )
    expect( isBoolValid( decl, false ) ).toBe( true )
  } )

  it( 'should convert boolean with or', () => {
    const or = true
    const declOr = Bool( { or } )
    expect( getBool( declOr, [] ) ).toBe( or )
    expect( getBool( declOr, 'foo' ) ).toBe( or )

    const declOrDef = Bool( { orDefault: true } )
    expect( getBool( declOrDef, [] ) ).toBe( JBoolean.DEFAULT )
    expect( getBool( declOrDef, 'foo' ) ).toBe( JBoolean.DEFAULT )

  } )

  it( 'should convert boolean nullable', () => {
    const declNullable = Bool( { nullable: true } )
    expect( getBool( declNullable, 1 ) ).toBeNull()
    expect( getBool( declNullable, {} ) ).toBeNull()
    expect( getBool( declNullable, true ) ).toBe( true )
  } )

  it( 'should convert boolean optional', () => {
    const declOptional = Bool( { optional: true } )
    expect( getBool( declOptional, [] ) ).toBeUndefined()
    expect( getBool( declOptional, 'foo' ) ).toBeUndefined()
    expect( getBool( declOptional, false ) ).toBe( false )
  } )

  it( 'should throw on invalid convert boolean', () => {
    function testThrowing( val: unknown, decl: JBoolean ): void {
      expect( () => {
        getBool( decl, val )
        // TODO: custom error
      } ).toThrow( Error )
    }

    testThrowing( 5, Bool() )
    testThrowing( [], Bool() )
    testThrowing( {}, Bool() )
  } )

} )
