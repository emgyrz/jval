## JNumber _(Num)_
Represents JS numbers: `11`, `5.91`, `123e-5`, `0x31`. Expect `+-Infinity` and `NaN`
```ts
export class JNumber extends JValue {
  constructor( opts: undefined | JNumberOptions = {} ) {}
}

new JNumber(/* ?JNumberOptions */)
// or
Num(/* ?JNumberOptions */)
```

## JNumberOptions

```ts
export interface JNumberOptions extends CommonJValueOptions {
  or?: number,
  orDefault?: boolean,
  min?: number,
  max?: number,
  convert?: NumberConvertAliases | ConvertOptionType<number>,
  // nullable?: boolean,
  // optional?: boolean,
  // rename?: string,
}
```

### ```or```
The substituted value if the number cannot be obtained from the data
```js
const numOr = Num( { or: 7 } )

const validVal = convertValue( numOr, 10 )
console.assert( validVal === 10 )

const invalidVal = convertValue( numOr, 'foo' )
console.assert( invalidVal === 7 )
```


### ```orDefault```
If the value cannot be obtained, the `0` will be used.
Or value of `min` if it passed to options
```js
const numOrDefault = Num( { orDefault: true } )

const invalidVal = convertValue( numOrDefault, [ {} ] )
console.assert( invalidVal === 0 )
```


### ```min```
Minimum threshold number.
If the value in data is less than `min`, it is considered invalid.
```js
const numMin = Num( { min: 3 } )

const validVal = convertValue( numMin, 5 )
console.assert( validVal === 5 )

const invalidVal = convertValueOrNull( numMin, 1 )
console.assert( invalidVal === null )
```


### ```max```
Maximum threshold number.
If the value in data is more than `max`, it is considered invalid.
```js
const numMax = Num( { max: 5 } )

const invalidVal = convertValueOrNull( numMax, 9 )
console.assert( invalidVal === null )
```


### ```convert```
Describes how the resulting valid value should be converted
```ts
const numConvert = Num( { convert: {
  returnType: Obj( { props: { x: Num() } } ),
  method: (n: number) => ( { x: n } )  
} } )

const val = convertValue( numConvert, 3 )
console.assert( val.x === 3 )
```

Available aliases:
- `'toStr'` - converts number to string
- `'toDateFromSec'` - tries to convert number to Date from Unix timestamp in seconds
- `'toDateFromMs'` - tries to convert number to Date from Unix timestamp in milliseconds

```js
const numToStr = Num( { convert: 'toStr' } )

const str = convertValue( numToStr, 10 )
console.assert( str === '10' )


const numToDate = Num( { convert: 'toDateFromSec' } )

const date = convertValue( numToDate, 1577836800 )
console.assert( date.toISOString() === '2020-01-01T00:00:00.000Z' )
```
