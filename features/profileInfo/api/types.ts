export type ProfileUpdateArgs = {
  username: string
  firstName: string
  lastName: string
  dateOfBirth?: string | null
  city: string
  country: string
  aboutMe?: string
}

export type ProfileUpdateResponse = {
  success: boolean
  message: string
}
