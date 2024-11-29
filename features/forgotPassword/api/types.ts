export type ValidEmailResponse = {
  email: string
}
export type ValidEmailArgs = {
  email: string
  recaptchaValue: string
}
export type RecaptchaError = {
  message: string
}
export type PasswordRecoveryErrorResponse = {
  errorsMessages: ErrorsMessages[]
}
type ErrorsMessages = {
  field: string
  message: string
}
