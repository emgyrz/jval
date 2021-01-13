/* eslint-disable jest/expect-expect */

import { JvalError } from '../error'
import { convertValue, convertJsonValue, convertValueOrNull, convertJsonValueOrNull } from '..'
import { Num, Str } from '../../declarations'

const invalidData = [
  [ {}, null ],
  [ Num(), true ],
  [ Str( { literals:[ 'foo' ] } ), 'bar' ],
]

const invalidJson = '[{{2'

function testThrowing( f: CallableFunction ): void {
  expect( () => {
    f()
  } ).toThrow( JvalError )
}

describe( 'convert methods', () => {
  it( 'should convertValue throws', () => {
    invalidData.forEach( ( [ decl, val ] ) => {
      // @ts-ignore
      testThrowing( () => convertValue( decl, val ) )
    } )
  } )

  it( 'should convertJsonValue throws', () => {
    invalidData.forEach( ( [ decl, val ] ) => {
      // @ts-ignore
      testThrowing( () => convertJsonValue( decl, val ) )
    } )

    // @ts-ignore
    testThrowing( () => convertJsonValue( invalidJson, [] ) )
  } )


  it( 'should convertJsonOrNull not throws', () => {
    invalidData.forEach( ( [ decl, val ] ) => {
      // @ts-ignore
      const result = convertValueOrNull( decl, val )
      expect( result ).toBeNull()
    } )
  } )

  it( 'should convertJsonValueOrNull not throws', () => {
    invalidData.forEach( ( [ decl, val ] ) => {
      // @ts-ignore
      const result = convertJsonValueOrNull( decl, val )
      expect( result ).toBeNull()
    } )

    // @ts-ignore
    expect( convertJsonValueOrNull( invalidJson, [] ) ).toBeNull()
  } )

} )
