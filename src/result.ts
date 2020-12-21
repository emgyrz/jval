export enum ResultType {
  Ok,
  Err,
}

export type ResultOk<T> = {
  readonly type: ResultType.Ok,
  readonly value: T
}
export type ResultErr<E> = {
  readonly type: ResultType.Err,
  readonly error: E
}

export type Result<T, E> = ResultOk<T> | ResultErr<E>


export function ok<T>( value: T ): ResultOk<T> {
  return { type: ResultType.Ok, value }
}

export function err<E>( error: E ): ResultErr<E> {
  return { type: ResultType.Err, error }
}

export function isOk<T, E>( result: Result<T, E> ): result is ResultOk<T> {
  return result.type === ResultType.Ok
}

export function isErr<T, E>( result: Result<T, E> ): result is ResultErr<E> {
  return result.type === ResultType.Err
}

