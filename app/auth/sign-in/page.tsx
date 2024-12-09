'use client'

import { SignIn } from '@/features'
import { withAuthRedirect } from '@/shared'

export default withAuthRedirect(() => <SignIn />)
