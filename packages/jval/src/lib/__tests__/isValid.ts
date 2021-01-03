import { isValid } from '../isValid'
import { Arr, Bool, Num, Obj, Str } from '../../declarations'

describe( 'isValid', function () {
  it( 'should work with bool', function () {
    expect( isValid( Bool(), true ) ).toBe( true )
    expect( isValid( Bool(), 3 ) ).toBe( false )
  } )
  it( 'should work with num', function () {
    expect( isValid( Num(), 3 ) ).toBe( true )
    expect( isValid( Num(), 'true' ) ).toBe( false )
  } )
  it( 'should work with str', function () {
    expect( isValid( Str(), 'foo' ) ).toBe( true )
    expect( isValid( Str(), true ) ).toBe( false )
  } )
  it( 'should work with obj', function () {
    const decl = Obj( { props: { x: Num() } } )
    expect( isValid( decl, { x: 3 } ) ).toBe( true )
    expect( isValid( decl, { y: 5 } ) ).toBe( false )
  } )
  it( 'should work with arr', function () {
    const decl = Arr( { item: Str() } )
    expect( isValid( decl, [ 'foo' ] ) ).toBe( true )
    expect( isValid( decl, true ) ).toBe( false )
  } )
  it( 'should throw err with invalid decl', function () {
    expect( () => {
      // @ts-ignore
      isValid( {}, [] )
      // eslint-disable-next-line jest/require-to-throw-message
    } ).toThrow()
  } )
} )
