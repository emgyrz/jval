import { Arr, Num, Obj } from '../../../declarations'
import { convertValue } from '../../index'

const firstJan2020 = 1577836800000

describe( 'lib convert options', () => {
  it( 'should predefined number converters work', function() {
    const declToStr = Num( { convert:'toStr' } )
    expect( convertValue( declToStr, 1 ) ).toBe( '1' )

    const declToDateFromSec = Num( { convert:'toDateFromSec' } )
    expect(
      convertValue( declToDateFromSec, firstJan2020 / 1000 ),
    ).toStrictEqual( new Date( firstJan2020 ) )

    const declToDateFromMs = Num( { convert:'toDateFromMs' } )
    expect(
      convertValue( declToDateFromMs, firstJan2020 ),
    ).toStrictEqual( new Date( firstJan2020 ) )
  } )


  it( 'should convert number to object', function() {
    const decl = Num( {
      convert: {
        returnType: Obj( { props: { x: Arr( { item: Num() } ) } } ),
        method: ( n: number ): unknown => ( { x: [ n ] } ),
      },
    } )

    expect( convertValue( decl, 3 ) ).toStrictEqual( { x: [ 3 ] } )

  } )

} )

