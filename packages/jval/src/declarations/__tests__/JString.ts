import { JString, Str, JValueType, DeclarationError } from '..'

describe( 'jString', () => {
  it( 'defaults', () => {
    const str = Str()
    expect( str.jType ).toBe( JValueType.String )
    expect( str.jType ).toBe( 'String' )
    expect( str.or ).toBeNull()
    expect( str.orDefault ).toBe( false )
    expect( str.minLength ).toBeNull()
    expect( str.maxLength ).toBeNull()
    expect( str.maxLength ).toBeNull()
    expect( str.literals ).toBeNull()
  } )

  it( 'invalid opts', () => {
    const invalidOpts = [
      { or: 5 },
      { orDefault: [] },
      { minLength: '3' },
      { minLength: 3.1 },
      { minLength: -1 },
      { maxLength: {} },
      { maxLength: 10.1 },
      { maxLength: -1 },
      { nullable: 10 },
      { optional: 'foo' },
      { literals: {} },
      { literals: [] },
      { literals: [ 2 ] },
      { convert: (): void => { return } },
      { convert: 'notConvertAlias' },
    ]
    invalidOpts.forEach( ( opts ) => {
      expect( () => {
        // @ts-ignore
        new JString( opts )
      } ).toThrow( DeclarationError )
    } )
  } )

  it( 'conflicting opts', () => {
    const conflictingOpts = [
      { or: 'f', minLength: 3 },
      { or: 'foo', maxLength: 2 },
      { orDefault: true, maxLength: -5 },
      { orDefault: true, minLength: 5 },
      { minLength: 3, maxLength: 2 },
      { orDefault: true, or: 'bar' },
      { literals: [ 'f', 'f' ] },
      { literals: [ 'foo' ], minLength: 5 },
      { literals: [ 'bar' ], maxLength: 2 },
    ]
    conflictingOpts.forEach( ( opts ) => {
      expect( () => {
        new JString( opts )
      } ).toThrow( DeclarationError )
    } )
  } )

  it( 'valid opts', () => {
    const decl = new JString( {
      or: 'foo',
      optional: true,
      nullable: true,
      minLength: 3,
      maxLength: 10,
      convert: 'toInt',
    } )
    expect( decl.or ).toBe( 'foo' )
    expect( decl.optional ).toBe( true )
    expect( decl.nullable ).toBe( true )
    expect( decl.minLength ).toBe( 3 )
    expect( decl.maxLength ).toBe( 10 )

    // TODO:
    // expect( decl.convert ).toBe( 10 )
  } )

} )
