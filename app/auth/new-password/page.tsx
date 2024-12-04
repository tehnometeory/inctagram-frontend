'use client'

import { NewPasswordForm } from '@/features'
import { Suspense } from 'react'

export default function NewPassword() {
  return (
    <Suspense>
      <NewPasswordForm />
    </Suspense>
  )
}
