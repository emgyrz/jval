## Declarations

This is how you describe the expected values.
Аll of them are classes that take validation and conversion parameters in the constructor.
Also, to keep the code compact, they all have short aliases to create.

```js
// Available declarations are:
import {
  JNull, Null,
  JBoolean, Bool,
  JNumber, Num,
  JString, Str,
  JObject, Obj,
  JArray, Arr
} from 'jval'

// Definition
const arrDecl1 = new JArray( { item: new JNumber( { nullable: true } ) } )
// or
const arrDecl2 = Arr( { item: Num( { nullable: true } ) } )
```

### Using directly with convert functions:
```js
import { convertValue, Str } from 'jval'

const expectedString = Str( { notEmpty: true, nullable: true } )

const valid = convertValue( expectedString, 'foo' )
console.assert(valid === 'foo')

const invalid = convertValue( expectedString, '' )
console.assert(invalid === null)
```

### Using code generation
Create some file with declaration.

_**Warning!** Now, files processed by the `jval-codegen` cannot import or export anything other than declarations from `jval`_

```js
///// file - ./src/me.decl.js 
import { Str, Obj, Num, Bool } from 'jval'

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
```
After this run codegen
```shell
jval-codegen --src-root ./src --types flow
```
Based on this declaration, such a file will be generated.
( for `typescript` it will be the same )
```ts
///// file - ./src/me.gen.js
// @flow

/* ... some imports ... */

export type MeDataInType = {|
  myName: string,
  birthDate?: number,
  last_name: string,
  is_programmer?: boolean,
|}

export type MeDataType = {|
  myName: string,
  birthDate: null | Date,
  lastName: string,
  isHacker: 'yes' | 'no',
|}

export function convertMeDataFrom( inputData: any ): MeDataType {
  // ...
  // all values returned from this function are valid!
}

/* ... some other code ... */

```

See comparison with manual realisation [here](/example/manual_conversation.ts)

Details can be found in specific declaration description.


