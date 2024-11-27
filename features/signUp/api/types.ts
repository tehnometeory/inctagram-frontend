export type RegistrationBody = {
  email: string
  password: string
  username: string
}
export type RegistrationErrorResponse = {
  errorsMessages: ErrorsMessages[]
}
type ErrorsMessages = {
  field: string
  message: string
}
