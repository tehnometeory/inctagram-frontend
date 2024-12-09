'use client'

import { ExpiredEmailLinkForm, RoutesApp, useNRouter, withAuthRedirect } from '@/shared'

export const PasswordRecovery = withAuthRedirect(() => {
  const router = useNRouter()

  const onSubmit = () => {
    router.push(RoutesApp.forgotPassword)
  }

  return <ExpiredEmailLinkForm isDisabled={false} onSubmitHandler={onSubmit} showInput={false} />
})
