import { jwtDecode } from 'jwt-decode'

type JWTPayload = {
  exp: number
}

export const checkTokenValidity = (token: string): boolean => {
  const { exp }: JWTPayload = jwtDecode(token)

  return exp * 1000 < Date.now()
}
