import { useEffect, useState } from 'react'

import { checkTokenValidity } from '@/shared'
import { useRouter, useSearchParams } from 'next/navigation'

export const useCheckTokenValidity = (path: string): boolean => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isRedirecting, setIsRedirecting] = useState(true)
  const token = searchParams.get('code')

  useEffect(() => {
    if (!token || !checkTokenValidity(token)) {
      router.replace(path)
    } else {
      setIsRedirecting(false)
    }
  }, [router])

  return isRedirecting
}
