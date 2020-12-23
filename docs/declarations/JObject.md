## JObject _(Obj)_

Represents JS string

```ts
export class JObject extends JValue {
  constructor( opts: JObjectOptions ) {}
}

new JObject(/* JObjectOptions */ )
// or
Obj(/* JObjectOptions */ )
```

## JObjectOptions

```ts
export interface JObjectOptions extends CommonJValueOptions {
  props: Record<string, JValue>, // required  
  convert?: ConvertOptionType<{ [ k: string ]: unknown }>,
  // nullable?: boolean,
  // optional?: boolean,
  // rename?: string,
}
```

### ```props```

The description of the fields that the object should have. This is the only required parameter.

```js
const TeaDecl = Obj( {
  props: {
    name: Str( { minLength: 5 } ),
    price: Str( { convert: 'toFloat' } ),
    is_popular: Bool( { rename: 'isPop' } ),
    fans: Arr( { skipNonValid: true, item: Obj( { props: { id: Num() } } ) } ),
  },
  nullable: false,
} )

const validInputVal = {
  name: 'Kenyan tea',
  price: "3.71",
  is_popular: true,
  fans: [ { deleted: true }, { id: 519 } ]
}

const converted = convertValue( TeaDecl, validInputVal )
console.assert( typeof converted.price === 'number' )
console.assert( converted.fans.length === 1 )
console.assert( converted.name.length >= 5 )
console.assert( converted.isPop === true )
```

### ```convert```

TODO

```js
// TODO
```

