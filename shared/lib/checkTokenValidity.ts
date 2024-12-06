import { jwtDecode } from 'jwt-decode'

type JWTPayload = {
  exp: number
}

export const checkTokenValidity = (token: string): boolean => {
  try {
    const { exp }: JWTPayload = jwtDecode(token)

    return exp * 1000 > Date.now()
  } catch {
    return false
  }
}
