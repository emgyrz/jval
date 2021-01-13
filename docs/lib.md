## functions

`jval` contains functions for converting and validating values
based on declarations.
If you use the code generator, you actually don't need to import and call them directly.

If value cannot be converted, all converter functions returns:
- `null`, if value is nullable
- `undefined`, if it is optional
- throws error ( only `convertValue` and `convertJsonValue` )

Otherwise, it returns valid value that exactly matches the declaration.

In all of them the first argument is value declaration: one of `Jstring`, `JArray`, etc.

The second argument is what should be converted or validated.
`value` must be primitive or object that existed in ES5.
Now lib can handle only booleans, numbers, strings, plain objects,
arrays (not typed arrays like `Int8Array` or `ArrayBuffer`) and `null`(!).
`Map`, `Symbol`, `Promise` or some other "new" objects are not supported.

For simplicity, you can assume that these functions can only work with JSON valid value types.

The generic converter functions signature is
```ts
convertXXX( declaration: JValue, value: unknown ): null | undefined | unknown {}
```


### List of available functions

### `convertValue`
Tries to get a passed value according to declaration
```js
const decl = Arr( { item: Str( { convert: 'toFloat' } ) } )

const valid = convertValue( decl, [ '1', '37.59' ] )
console.assert( valid[ 1 ] === 37.59 )

const invalid = convertValue( decl, [ { x: '1' }, true ] )
// throws an error
```

### `convertJsonValue`
Same as previous but takes in second argument JSON string
```js
const decl = Obj( { props: { x: Num() } } )

const valid = convertJsonValue( decl, "{\"x\":3}" )
console.assert( valid.x === 3 )

convertJsonValue( decl, "{\"y\":10}" )
// throws an error
```

### `convertValueOrNull`
Like `convertValue` but instead of throwing error returns `null`
```js
const decl = Str( { minLength: 5 } )

const invalid1 = convertValueOrNull( decl, "foo" )
const invalid2 = convertValueOrNull( decl, [ { prop: new Map() } ] )
console.assert( invalid1 === null )
console.assert( invalid2 === null )
```

### `convertJsonValueOrNull`
You know what it does

### `isValueValid`
Just validates value. Does not perform any conversions.
Returns `boolean`
```js
const decl = Num( { min: 5 } )

console.assert( isValueValid( decl, 10 ) )
console.assert( !isValueValid( decl, 3 ) )
```
