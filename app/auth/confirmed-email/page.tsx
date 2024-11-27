'use client'

import { ConfirmedEmail } from '@/features'
import { checkTokenValidity } from '@/shared'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ConfirmedEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const token = searchParams.get('code')

  if (!token || !checkTokenValidity(token)) {
    router.replace('/auth/expired-email')
  }

  return <ConfirmedEmail />
}
