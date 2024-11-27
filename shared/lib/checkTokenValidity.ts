import { jwtDecode } from 'jwt-decode'

type JWTPayload = {
  exp: number
}
export const checkTokenValidity = (token: string): boolean => {
  try {
    const { exp }: JWTPayload = jwtDecode(token)
    const now = Math.floor(Date.now() / 1000)

    return now <= exp
  } catch (error) {
    console.error('token processing error: ', error)

    return false
  }
}