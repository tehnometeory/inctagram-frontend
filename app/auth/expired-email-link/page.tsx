'use client'

import { ExpiredEmailLink } from '@/features'
import { withAuthRedirect } from '@/shared'

export default withAuthRedirect(() => <ExpiredEmailLink />)
