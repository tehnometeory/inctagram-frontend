'use client'

import { Suspense } from 'react'

import { ConfirmedEmail } from '@/features'
import { withAuthRedirect } from '@/shared'

export default withAuthRedirect(() => (
  <Suspense>
    <ConfirmedEmail />
  </Suspense>
))
