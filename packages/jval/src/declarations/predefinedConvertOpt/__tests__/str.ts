
import { isValidDate } from 'hlp'
import { strConvertPredefined } from '../str'


describe( 'str predefinedConvertOpt', () => {

  it( 'toInt', () => {
    expect( strConvertPredefined.toInt.method( '1' ) ).toBe( 1 )
    expect( strConvertPredefined.toInt.method( '1.1' ) ).toBeNull()
  } )

  it( 'toFloat', () => {
    expect( strConvertPredefined.toFloat.method( '1.1' ) ).toBe( 1.1 )
    expect( strConvertPredefined.toFloat.method( '5' ) ).toBe( 5 )
    // @ts-ignore
    expect( strConvertPredefined.toFloat.method( {} ) ).toBeNull()
  } )

  it( 'toDate', () => {
    const d = new Date().toISOString()
    const converted = strConvertPredefined.toDate.method( d )
    expect( isValidDate( converted ) ).toBe( true )
    // @ts-ignore
    expect( strConvertPredefined.toDate.method( '' ) ).toBeNull()
  } )

} )
