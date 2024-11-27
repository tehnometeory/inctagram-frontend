'use client'
import { useEffect } from 'react'

import { checkTokenValidity } from '@/shared/lib/CheckTokenValidity'
import { ConfirmedEmail } from '@/shared/ui/ConfirmedEmail/ConfirmedEmail'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ConfirmedEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('code')

    if (!token) {
      router.replace('/auth/expired-email')

      return
    }
    if (!checkTokenValidity(token)) {
      router.replace('/auth/expired-email')

      return
    }
  }, [searchParams, router])

  return <ConfirmedEmail />
}
