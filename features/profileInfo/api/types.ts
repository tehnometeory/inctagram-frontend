import { ErrorsMessagesResponse } from '@/shared'

export type ProfileUpdateArgs = {
  username: string
  firstName: string
  lastName: string
  dateOfBirth?: string | null
  city: string
  country: string
  aboutMe?: string
}
export type ProfileInfoResponse = ErrorsMessagesResponse | void
