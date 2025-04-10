export type ResetPasswordResponse = {
  email: string
}
export type ResetPasswordArgs = {
  email: string
  recaptchaValue?: string
}
