import { ErrorsMessagesResponse } from '@/shared'

export type LoginBody = {
  email: string
  password: string
}

type LoginSuccessResponse = {
  accessToken: string
}

export type SignInResponse = ErrorsMessagesResponse | LoginSuccessResponse