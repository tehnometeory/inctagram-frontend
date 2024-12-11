import { ErrorsMessagesResponse, ResponseWithAccessToken } from '@/shared'

export type LoginBody = {
  email: string
  password: string
}

export type SignInResponse = ErrorsMessagesResponse | ResponseWithAccessToken
