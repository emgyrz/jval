import { JNumber, Num } from '../../../declarations'
import { getNum, isNumValid } from '../num'

describe( 'number converter', () => {
  it( 'should validate number no opts', () => {
    const decl = Num()
    expect( isNumValid( decl, '' ) ).toBe( false )
    expect( isNumValid( decl, 1 ) ).toBe( true )
  } )

  it( 'should validate number with length', () => {
    const decl = Num( { min: -1, max: 1 } )
    expect( isNumValid( decl, -1 ) ).toBe( true )
    expect( isNumValid( decl, 1 ) ).toBe( true )
    expect( isNumValid( decl, -30 ) ).toBe( false )
    expect( isNumValid( decl, 50 ) ).toBe( false )
  } )


  it( 'should convert number with or', () => {
    const or = 10
    const declOr = Num( { or } )
    expect( getNum( declOr, [] ) ).toBe( or )
    expect( getNum( declOr, 'foo' ) ).toBe( or )
    expect( getNum( declOr, 71 ) ).toBe( 71 )

    const declOrDef = Num( { orDefault: true } )
    expect( getNum( declOrDef, [] ) ).toBe( JNumber.DEFAULT )
    expect( getNum( declOrDef, 'foo' ) ).toBe( JNumber.DEFAULT )
  } )

  it( 'should convert number nullable', () => {
    const declWithMinNullable = Num( { nullable: true, min: 2 } )
    expect( getNum( declWithMinNullable, 1 ) ).toBeNull()
    expect( getNum( declWithMinNullable, {} ) ).toBeNull()
    expect( getNum( declWithMinNullable, 'f' ) ).toBeNull()
    expect( getNum( declWithMinNullable, 5 ) ).toBe( 5 )
  } )

  it( 'should convert number optional', () => {
    const declWithMaxOptional = Num( { optional: true, max: 10 } )
    expect( getNum( declWithMaxOptional, [] ) ).toBeUndefined()
    expect( getNum( declWithMaxOptional, 11 ) ).toBeUndefined()
    expect( getNum( declWithMaxOptional, 'foo' ) ).toBeUndefined()
    expect( getNum( declWithMaxOptional, 5 ) ).toBe( 5 )
  } )

  it( 'should throw on invalid convert number', () => {
    function testThrowing( val: unknown, decl: JNumber ): void {
      expect( () => {
        getNum( decl, val )
        // TODO: custom error
      } ).toThrow( Error )
    }

    testThrowing( 5, Num( { max: 2 } ) )
    testThrowing( 1, Num( { min: 5 } ) )
    testThrowing( [], Num() )
    testThrowing( {}, Num() )
  } )

} )
