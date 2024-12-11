'use client'

import { Suspense } from 'react'

import { ConfirmedEmail } from '@/features'

export default function ConfirmedEmailpage() {
  return (
    <Suspense>
      <ConfirmedEmail />
    </Suspense>
  )
}
