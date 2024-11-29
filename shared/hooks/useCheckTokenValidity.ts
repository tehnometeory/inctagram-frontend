import { useEffect, useState } from 'react'

import { checkTokenValidity } from '@/shared'
import { useRouter, useSearchParams } from 'next/navigation'

export const useCheckTokenValidity = (redirectTo: string, searchParameter: string): boolean => {
  const [isRedirecting, setIsRedirecting] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  const token = searchParams.get(searchParameter)

  useEffect(() => {
    if (!token || !checkTokenValidity(token)) {
      router.replace(redirectTo)
    } else {
      setIsRedirecting(false)
    }
  }, [token, redirectTo, router])

  return isRedirecting
}
