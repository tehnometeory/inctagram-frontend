'use client'

import { ForgotPassword } from '@/features'
import { withAuthRedirect } from '@/shared'

export default withAuthRedirect(() => <ForgotPassword />)
