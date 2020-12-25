
import { isValidDate } from 'hlp'
import { numConvertPredefined } from '../num'

const TS = Math.floor( new Date().getTime() / 1000 )

describe( 'num predefinedConvertOpt', () => {
  it( 'toStr', () => {
    const converted = numConvertPredefined.toStr.method( 1 )
    expect( converted ).toBe( '1' )
  } )
  it( 'toDateFromMs', () => {
    const d = numConvertPredefined.toDateFromMs.method( TS * 1000 )
    expect( isValidDate( d ) ).toBe( true )
    expect( ( d as Date ).getTime() ).toBe( TS * 1000 )
    // @ts-ignore
    expect( numConvertPredefined.toDateFromMs.method( {} ) ).toBeNull()
  } )
  it( 'toDateFromSec', () => {
    const d = numConvertPredefined.toDateFromSec.method( TS )
    expect( isValidDate( d ) ).toBe( true )
    expect( ( d as Date ).getTime() ).toBe( TS * 1000 )
  } )
} )
