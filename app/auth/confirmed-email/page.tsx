'use client'

import { Suspense } from 'react'

import { ConfirmedEmail } from '@/features'

export default function ConfirmedEmailPage() {
  return (
    <Suspense>
      <ConfirmedEmail />
    </Suspense>
  )
}
