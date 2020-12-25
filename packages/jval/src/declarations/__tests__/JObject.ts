import { JObject, Obj, Bool, Num, JValueType, DeclarationError } from '..'

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
      { props: [] },
      { props: { invalid: 3 } },
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
