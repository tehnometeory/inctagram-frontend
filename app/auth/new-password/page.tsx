'use client'

import { Suspense } from 'react'

import { NewPassword } from '@/features'

export default function NewPasswordPage() {
  return (
    <Suspense>
      <NewPassword />
    </Suspense>
  )
}
