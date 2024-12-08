'use client'

import { Suspense } from 'react'

import { NewPasswordForm } from '@/features'

export default function NewPassword() {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  )
}
