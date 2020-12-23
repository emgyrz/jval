import { JObject, Obj } from '../JObject'
import { Bool } from '../JBoolean'
import { Num } from '../JNumber'
import { JValueType } from '../types'
import { DeclarationError } from '../error'

describe( 'jObject', () => {
  it( 'defaults', () => {
    const obj = Obj( { props: { bool: Bool(), num: Num() } } )
    expect( obj.jType ).toBe( JValueType.Object )
    expect( obj.jType ).toBe( 'Object' )
    expect( obj.props.bool.jType ).toBe( JValueType.Boolean )
    expect( obj.props.num.jType ).toBe( JValueType.Number )
  } )

  it( 'invalid opts', () => {
    const invalidOpts = [
      {},
      undefined,
    ]
    invalidOpts.forEach( ( opts ) => {
      expect( () => {
        // @ts-ignore
        new JObject( opts )
      } ).toThrow( DeclarationError )
    } )
  } )

} )
