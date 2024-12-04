import { ErrorsMessagesResponse } from '@/shared'

export type RegistrationResponse = ErrorsMessagesResponse | void
export type RegistrationBody = {
  email: string
  password: string
  username: string
}
