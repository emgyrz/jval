## JArray _(Arr)_

Represents JS array of elements with the same type.

```ts
export class JArray extends JValue {
  constructor( opts: JArrayOptions ) {}
}

new JArray(/* JArrayOptions */ )
// or
Arr(/* JArrayOptions */ )
```

## JArrayOptions

```ts
export interface JArrayOptions extends CommonJValueOptions {
  item: JValue, // required
  or?: () => Array<unknown>,
  orDefault?: boolean,
  notEmpty?: boolean,
  skipNonValid?: boolean,
  convert?: ConvertOptionType<Array<unknown>>
}

```

### ```item```

The description of array elements. Inner elements can only be values of the same type. 
This is the only required parameter.

```js
const decl = Arr( {
  item: Bool()
} )

const valid = convertValue( decl, [ false, false, true ] )
console.assert( valid.length === 3 && valid[ 2 ] === true )

console.assert( convertValueOrNull( decl, 3 ) === null )
console.assert( convertValueOrNull( decl, [ 'foo' ] ) === null )
```

### `or`

TODO

```js
// TODO
```

### `orDefault`

TODO

```js
// TODO
```

### `notEmpty`

TODO

```js
// TODO
```

### `skipNonValid`

TODO

```js
// TODO
```

### `convert`

TODO

```js
// TODO
```

