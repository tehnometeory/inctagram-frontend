export type SetPasswordResponse = any

export type SetPasswordArg = {
  code: null | string
  password: string
}

type ValidationError = {
  field: string
  message: string
}

export type ErrorResponse = {
  errorsMessages?: ValidationError[]
}
