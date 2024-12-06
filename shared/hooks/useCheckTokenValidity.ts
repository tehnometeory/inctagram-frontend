'use client'
import { useEffect, useState } from 'react'

import { checkTokenValidity, useNRouter } from '@/shared'
import { useSearchParams } from 'next/navigation'

type NRouter = {
  back: (nProgressOptions?: any) => void
  push: (href: string, options?: any, nProgressOptions?: any) => void
  replace: (href: string, options?: any, nProgressOptions?: any) => void
}
type ReturnParameters = {
  isRedirecting: boolean
  router: NRouter
  token: null | string
}

export const useCheckTokenValidity = (
  redirectTo: string,
  searchParameter: string
): ReturnParameters => {
  const [isRedirecting, setIsRedirecting] = useState(true)
  const router = useNRouter()
  const searchParams = useSearchParams()

  const token = searchParams.get(searchParameter)

  useEffect(() => {
    if (!token || !checkTokenValidity(token)) {
      // router.replace(redirectTo)
      setIsRedirecting(false)
    } else {
      setIsRedirecting(false)
    }
  }, [token, redirectTo, router])

  return { isRedirecting, router, token }
}
