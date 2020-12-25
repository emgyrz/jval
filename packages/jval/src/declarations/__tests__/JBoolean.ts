import { JBoolean, Bool, JValueType, DeclarationError, Num } from '..'

describe( 'jArray', () => {
  it( 'defaults', () => {
    const bool = Bool()
    expect( bool.jType ).toBe( JValueType.Boolean )
    expect( bool.jType ).toBe( 'Boolean' )
    expect( bool.nullable ).toBe( false )
    expect( bool.optional ).toBe( false )
    expect( bool.or ).toBeNull()
    expect( bool.orDefault ).toBe( false )
  } )

  it( 'invalid opts', () => {
    const invalidOpts = [
      { or: '' },
      { orDefault: [] },
      { convert: (): void => { return } },
      { convert: 'bar' },
    ]
    invalidOpts.forEach( ( opts ) => {
      expect( () => {
        // @ts-ignore
        new JBoolean( opts )
      } ).toThrow( DeclarationError )
    } )
  } )

  it( 'conflicting opts', () => {
    const conflictingOpts = [
      { orDefault: true, or: false },
    ]
    conflictingOpts.forEach( ( opts ) => {
      expect( () => {
        new JBoolean( opts )
      } ).toThrow( DeclarationError )
    } )
  } )

  it( 'valid opts', () => {
    const decl = new JBoolean( {
      or: true,
      convert: {
        returnType: Num(),
        method: ( bool: boolean ): number => bool ? 1 : 0,
      },
    } )
    expect( decl.or ).toBe( true )
    // @ts-ignore
    const method: CallableFunction = decl.convert?.method
    expect( method( true ) ).toBe( 1 )
    expect( method( false ) ).toBe( 0 )
  } )

} )
