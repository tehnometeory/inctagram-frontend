'use client'

import { SignUp } from '@/features'
import { withAuthRedirect } from '@/shared'

export default withAuthRedirect(() => <SignUp />)
