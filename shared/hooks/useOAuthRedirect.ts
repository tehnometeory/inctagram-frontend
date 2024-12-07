'use client'

import { useRouter } from 'next/navigation'

import { BASE_URL_API } from '../api'

export const useOAuthRedirect = (to: string) => {
  const router = useRouter()

  return () => {
    router.push(BASE_URL_API + `oauth/${to}/login`)
  }
}
