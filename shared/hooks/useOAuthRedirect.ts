'use client'

import { BASE_URL_API } from '../api'
import { useNRouter } from './useNRouter'

export const useOAuthRedirect = (to: string) => {
  const router = useNRouter()

  return () => {
    router.push(BASE_URL_API + `oauth/${to}/login`)
  }
}
