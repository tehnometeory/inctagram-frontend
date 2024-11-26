export type LoginBody = {
  email: string
  password: string
}
export type LoginErrorResponse = {
  errorsMessages: ErrorsMessages[]
}

export type LoginSuccessResponse = {
  accessToken: string
}
type ErrorsMessages = {
  field: string
  message: string
}

export type FormValues = {
  email: string
  password: string
}
