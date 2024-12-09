'use client'

import { Suspense } from 'react'

import { NewPasswordForm } from '@/features'
import { withAuthRedirect } from '@/shared'

export default withAuthRedirect(() => (
  <Suspense>
    <NewPasswordForm />
  </Suspense>
))
