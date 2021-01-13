import { isValueValid } from '..'
import { Arr, Bool, Num, Obj, Str } from '../../declarations'
import { JvalError } from '../error'

describe( 'isValid', () => {
  it( 'should work with bool', () => {
    expect( isValueValid( Bool(), true ) ).toBe( true )
    expect( isValueValid( Bool(), 3 ) ).toBe( false )
  } )
  it( 'should work with num', () => {
    expect( isValueValid( Num(), 3 ) ).toBe( true )
    expect( isValueValid( Num(), 'true' ) ).toBe( false )
  } )
  it( 'should work with str', () => {
    expect( isValueValid( Str(), 'foo' ) ).toBe( true )
    expect( isValueValid( Str(), true ) ).toBe( false )
  } )
  it( 'should work with obj', () => {
    const decl = Obj( { props: { x: Num() } } )
    expect( isValueValid( decl, { x: 3 } ) ).toBe( true )
    expect( isValueValid( decl, { y: 5 } ) ).toBe( false )
  } )
  it( 'should work with arr', () => {
    const decl = Arr( { item: Str() } )
    expect( isValueValid( decl, [ 'foo' ] ) ).toBe( true )
    expect( isValueValid( decl, true ) ).toBe( false )
  } )
  it( 'should throw err with invalid decl', () => {
    expect( () => {
      // @ts-ignore
      isValueValid( {}, [] )
    } ).toThrow( JvalError )
  } )
} )
