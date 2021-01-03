import { Arr, Num, Obj, Str } from '../../../declarations'
import { getObj, isObjValid } from '../obj'

describe( 'object converter', () => {
  it( 'should validate object', function() {
    const decl = Obj( { props: { x: Num( { min: 3 } ) } } )
    expect( isObjValid( decl, 1 ) ).toBe( false )
    expect( isObjValid( decl, {} ) ).toBe( false )
    expect( isObjValid( decl, 'foo' ) ).toBe( false )
    expect( isObjValid( decl, true ) ).toBe( false )
    expect( isObjValid( decl, [ 2, 1 ] ) ).toBe( false )

    expect( isObjValid( decl, { x: 3 } ) ).toBe( true )
    expect( isObjValid( decl, { x: 3, arr: [ 1 ], y: 'foo' } ) ).toBe( true )
  } )



  it( 'should convert object', function() {
    const declSimple = Obj( { props: { x: Num( { min: 3 } ) } } )
    expect( getObj( declSimple, { x: 3 } ) ).toStrictEqual( { x: 3 } )
    expect( getObj( declSimple, { x: 3, arr: [ 1 ], y: 'foo' } ) ).toStrictEqual( { x: 3 } )

    const decl = Obj( {
      props: {
        x: Num( { rename: 'y' } ),
        arr: Arr( { item: Str( { minLength: 2 } ), rename: 'list', skipNonValid: true } ),
        str: Str( { optional: true } ),
        num: Num( { nullable: true } ),
      },
    } )

    expect( getObj( decl, {
      x: 3,
      arr: [ 'f', 'foo' ],
      str: 'bar',
    } ) ).toStrictEqual( {
      y: 3,
      list: [ 'foo' ],
      str: 'bar',
      num: null,
    } )

    expect( getObj( decl, {
      x: 1,
      arr: [ 'f' ],
      num: 5,
    } ) ).toStrictEqual( {
      y: 1,
      list: [],
      num: 5,
    } )

  } )

  it( 'should convert with nullable', function () {
    const decl = Obj( { props: { y: Num() }, nullable: true } )
    expect( getObj( decl, { y: 5 } ) ).toStrictEqual( { y: 5 } )
    expect( getObj( decl, [] ) ).toBeNull()
  } )

} )
