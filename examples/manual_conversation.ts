// @ts-nocheck


// declaration with `jtv`
export const MeData = Obj( {
  myName: Str( { minLength: 3 } ),
  birthDate: Num( { nullable: true, convert: 'toDateFromSec' } ),
  last_name: Str( { rename: 'lastName' } ),
  is_programmer: Bool( {
    orDefault: true,
    rename: 'isHacker',
    convert: {
      returnType: Str( { literals: [ 'yes', 'no' ] } ),
      method: ( isTrue ) => isTrue ? 'yes' : 'no'
    }
  } )
} )


// manual typings
export type MeDataInType = {
  myName: string,
  birthDate?: number,
  last_name: string,
  is_programmer?: boolean,
}
export type MeDataType = {
  myName: string,
  birthDate: null | Date,
  lastName: string,
  isHacker: 'yes' | 'no',
}

// and manual converter realisation
const DEFAULT_BOOL = false
export function convertMeDataFrom( data: any ): MeDataType {
  if ( typeof data !== 'object' ) {
    throw new Error( 'invalid input data' )
  }

  let myName: string
  if ( typeof data.myName !== 'string' || data.myName.length <= 3 ) {
    errorWith( 'myName' )
  } else {
    myName = data.myName
  }

  let birthDate: null | Date = null
  if ( typeof data.birthDate === 'number' ) {
    birthDate = tryGetDateFromSeconds( data.birthDate )
  }

  let lastName: string
  if ( typeof data.last_name !== 'string' ) {
    errorWith( 'last_name' )
  } else {
    lastName = data.last_name
  }

  const isProgrammer = typeof data.is_programmer !== 'boolean' ? DEFAULT_BOOL : data.is_programmer
  const isHacker = isProgrammer ? 'yes' : 'no'

  return {
    myName,
    birthDate,
    lastName,
    isHacker
  }
}

function tryGetDateFromSeconds( maybeSeconds: number ): null | Date {
  const date = new Date( maybeSeconds * 1000 )
  if ( !Number.isNaN( date.getTime() ) ) {
    return date
  }
  return null
}

function errorWith( propKey: string ): never {
  throw new Error( `cannot convert "${ propKey }" property` )
}


////////////////////////
//  13 lines vs. ~60  //
////////////////////////
