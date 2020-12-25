import { JNumber, Num, JValueType, DeclarationError } from '..'

describe( 'jNumber', () => {
  it( 'defaults', () => {
    const num = Num()
    expect( num.jType ).toBe( JValueType.Number )
    expect( num.jType ).toBe( 'Number' )
    expect( num.nullable ).toBe( false )
    expect( num.optional ).toBe( false )
    expect( num.or ).toBeNull()
    expect( num.orDefault ).toBe( false )
    expect( num.min ).toBeNull()
    expect( num.max ).toBeNull()
  } )

  it( 'invalid opts', () => {
    const invalidOpts = [
      { or: '' },
      { orDefault: [] },
      { min: '3' },
      { max: {} },
      { nullable: 10 },
      { optional: 'foo' },
      { convert: (): void => { return } },
      { convert: 'notConvertAlias' },
    ]
    invalidOpts.forEach( ( opts ) => {
      expect( () => {
        // @ts-ignore
        new JNumber( opts )
      } ).toThrow( DeclarationError )
    } )
  } )

  it( 'conflicting opts', () => {
    const conflictingOpts = [
      { or: 2, min: 3 },
      { or: 10, max: 5 },
      { orDefault: true, max: -5 },
      { orDefault: true, min: 5 },
      { min: 3, max: 2 },
      { orDefault: true, or: 10 },
    ]
    conflictingOpts.forEach( ( opts ) => {
      expect( () => {
        new JNumber( opts )
      } ).toThrow( DeclarationError )
    } )
  } )

  it( 'valid opts', () => {
    const decl = new JNumber( {
      or: 7,
      optional: true,
      nullable: true,
      min: 3,
      max: 10,
      convert: 'toStr',
    } )
    expect( decl.or ).toBe( 7 )
    expect( decl.optional ).toBe( true )
    expect( decl.nullable ).toBe( true )
    expect( decl.min ).toBe( 3 )
    expect( decl.max ).toBe( 10 )

    // TODO:
    // expect( decl.convert ).toBe( 10 )
  } )

} )
