import { Arr, JArray, Num, Str } from '../../../declarations'
import { getArr, isArrValid } from '../arr'

describe( 'array converter', () => {
  it( 'should validate array', () => {
    const decl = Arr( { item: Num( { min: 3 } ) } )
    expect( isArrValid( decl, 1 ) ).toBe( false )
    expect( isArrValid( decl, {} ) ).toBe( false )
    expect( isArrValid( decl, 'foo' ) ).toBe( false )
    expect( isArrValid( decl, true ) ).toBe( false )
    expect( isArrValid( decl, [ 2, 1 ] ) ).toBe( false )

    expect( isArrValid( decl, [] ) ).toBe( true )
    expect( isArrValid( decl, [ 5, 19 ] ) ).toBe( true )
  } )


  it( 'should convert array with orDefault', () => {
    const decl = Arr( { orDefault: true, item: Str() } )
    expect( getArr( decl, {} ) ).toStrictEqual( JArray.DEFAULT() )
    expect( getArr( decl, 1 ) ).toStrictEqual( JArray.DEFAULT() )
  } )

  it( 'should convert array with nullable', () => {
    const decl = Arr( { nullable: true, item: Str() } )
    expect( getArr( decl, {} ) ).toBeNull()
    expect( getArr( decl, 1 ) ).toBeNull()
  } )


  it( 'should convert array with or', () => {
    const decl = Arr( { or: (): string[] => [ 'foo' ], item: Str() } )
    expect( getArr( decl, {} ) ).toStrictEqual( [ 'foo' ] )
    expect( getArr( decl, [ 'bar' ] ) ).toStrictEqual( [ 'bar' ] )
  } )


  it( 'should convert array with notEmpty', () => {
    const decl = Arr( { notEmpty: true, item: Num(), nullable: true } )
    expect( getArr( decl, [] ) ).toBeNull()
    expect( getArr( decl, [ 2 ] ) ).toStrictEqual( [ 2 ] )
  } )

} )
