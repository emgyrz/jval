## JString _(Str)_

Represents JS string

```ts
export class JString extends JValue {
  constructor( opts: undefined | JStringOptions = {} ) {}
}

new JString(/* ?JStringOptions */ )
// or
Str(/* ?JStringOptions */ )
```

## JStringOptions

```ts
export interface JStringOptions extends CommonJValueOptions {
  or?: string,
  orDefault?: boolean,
  minLength?: number,
  maxLength?: number,
  literals?: string[],
  convert?: StringConvertAliases | ConvertOptionType<string>,
  // nullable?: boolean,
  // optional?: boolean,
  // rename?: string,
}
```

### ```or```

The substituted value if the string cannot be obtained from the data

```js
const strOr = Str( { or: 'foo' } )

const validVal = convertValue( strOr, 'bar' )
console.assert( validVal === 'bar' )

const invalidVal = convertValue( strOr, {} )
console.assert( invalidVal === 'foo' )
```

### ```orDefault```

If the value cannot be obtained, the empty string will be used.

```js
const strOrDefault = Str( { orDefault: true } )

const invalidVal = convertValue( strOrDefault, [ 1 ] )
console.assert( invalidVal === '' )
```

### ```minLength```

Minimum string length. If the string length in data is less than `minLength`, it is considered invalid.

```js
const strMinLen = Str( { minLength: 3 } )

const validVal = convertValue( strMinLen, 'foo' )
console.assert( validVal === 'foo' )

const invalidVal = convertValueOrNull( strMinLen, 'f' )
console.assert( invalidVal === null )
```

### ```maxLength```

Maximum string length. If the string length in data is more than `maxLength`, it is considered invalid.

```js
const strMaxLen = Str( { max: 5 } )

const invalidVal = convertValueOrNull( strMaxLen, 'foobar' )
console.assert( invalidVal === null )
```

### ```literals```

Accepts only passed strings. If exists, must be not empty and contains only strings. 
If using with codegen generates union string literal type, e.g. `"foo" | "bar"`

```js
const strLiteral = Str( { literals: [ 'foo', 'bar' ] } )

const validVal = convertValueOrNull( strLiteral, 'bar' )
console.assert( validVal === 'bar' )

const invalidVal = convertValueOrNull( strLiteral, 'lorem' )
console.assert( invalidVal === null )
```

### ```convert```

Describes how the resulting valid string should be converted

```ts
const strConvert = Str( {
  convert: {
    returnType: Arr( { item: Str() } ),
    method: ( n: string ) => n.split( ' ' )
  }
} )

const val = convertValue( strConvert, 'foo bar' )
console.assert( val[ 1 ] === 'bar' )
```

Available aliases:

- `'toDate'` - tries to convert string to `Date`
- `'toInt'` - tries to parse string as integer
- `'toFloat'` - tries to parse string as float number

```ts
const strToIntAlias = Str( { convert: 'toInt' } )
// is about the same as
const strToIntOwnImpl = Str( {
  convert: {
    returnType: Num(),
    method: ( str: string ): number => {
      const parsed = parseInt( str )
      if ( Number.isFinite( parsed ) ) return parsed
      throw new Error( `cant parse ${ str } as integer` )
    }
  }
} )

const val = convertValue( strToIntAlias, '3_foo' )
console.assert( val === 3 )
```
