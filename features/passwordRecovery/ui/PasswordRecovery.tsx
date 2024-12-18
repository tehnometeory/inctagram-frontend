'use client'

import { ExpiredEmailLinkForm, RoutesApp, useNRouter } from '@/shared'

export const PasswordRecovery = () => {
  const router = useNRouter()

  const onSubmit = () => {
    router.push(RoutesApp.forgotPassword)
  }

  return <ExpiredEmailLinkForm isDisabled={false} onSubmitHandler={onSubmit} showInput={false} />
}
