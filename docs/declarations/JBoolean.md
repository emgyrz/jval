## JBoolean _(Bool)_

Represents booleans

```ts
export class JBoolean extends JValue {
  constructor( opts: undefined | JBooleanOptions = {} ) {}
}

new JBoolean(/* ?JBooleanOptions */ )
// or
Bool(/* ?JBooleanOptions */ )
```

## JBooleanOptions

```ts
export interface JBooleanOptions extends CommonJValueOptions {
  or?: boolean,
  orDefault?: boolean,
  convert?: ConvertOptionType<boolean>,
}
```

### ```or```

The substituted value if the boolean cannot be obtained from the data

```js
const boolOr = Bool( { or: true } )

const validVal = convertValue( boolOr, false )
console.assert( validVal === false )

const invalidVal = convertValue( boolOr, 0 )
console.assert( invalidVal === true )
```

### ```orDefault```

If the value cannot be obtained, the `false` will be used.

```js
const boolOrDefault = Bool( { orDefault: true } )

const invalidVal = convertValue( boolOrDefault, [ {} ] )
console.assert( invalidVal === false )
```

### ```convert```

Describes how the resulting boolean should be converted

```ts
const boolConvert = Bool( {
  convert: {
    returnType: Obj( { props: { is: Str() } } ),
    method: ( val: boolean ) => ( { is: val === true ? 'yes' : 'no' } )
  }
} )

const val = convertValue( boolConvert, true )
console.assert( val.is === 'yes' )
```
