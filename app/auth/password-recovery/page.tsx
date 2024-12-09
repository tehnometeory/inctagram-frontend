'use client'

import { PasswordRecovery } from '@/features'
import { withAuthRedirect } from '@/shared'

export default withAuthRedirect(() => <PasswordRecovery />)
