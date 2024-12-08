'use client'

import { ExpiredEmailLinkForm, useNRouter } from '@/shared'

export const PasswordRecovery = () => {
  const router = useNRouter()

  const onSubmit = () => {
    router.push('/auth/forgot-password')
  }

  return <ExpiredEmailLinkForm isDisabled={false} onSubmitHandler={onSubmit} showInput={false} />
}
