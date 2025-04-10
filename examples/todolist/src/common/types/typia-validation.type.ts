import typia from 'typia'

export interface TypiaAssertError {
  response: typia.IValidation.IError
  status: number
  options: any
}

export type CustomIValidation<T = unknown> = CustomIValidation.ISuccess<T> | CustomIValidation.IFailure

export declare namespace CustomIValidation {
  interface ISuccess<T = unknown> {
    success: true
    data: T
    errors: []
  }
  interface IFailure {
    success: false
    errors: IError[]
  }
  interface IError {
    path: string
    expected: string
    value: any
    messages?: any
  }
}
