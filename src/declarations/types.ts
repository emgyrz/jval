
export interface Indexed {[ key: string ]: unknown}

export enum JValueType {
  Null = 'Null',
  Boolean = 'Boolean',
  Number = 'Number',
  String = 'String',
  Object = 'Object',
  Array = 'Array',
}
