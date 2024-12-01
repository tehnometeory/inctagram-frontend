'use client'

import { UseFormSetError } from 'react-hook-form'

import { useValidEmailMutation } from '@/features/ForgotPassword'
import { ResendConfirmationCodeArgs, ValidEmailArgs } from '@/features/expiredEmailLink/api/types'
import { ExpiredEmailLinkForm, handleRecoveryAndEmailLinkErrors, useAppDispatch } from '@/shared'

export const PasswordRecovery = () => {
  const [validEmail, { isLoading }] = useValidEmailMutation()

  const dispatch = useAppDispatch()

  const onSubmit = async (
    data: ValidEmailArgs,
    setError: UseFormSetError<ResendConfirmationCodeArgs>
  ) => {
    const response = await validEmail(data)

    return handleRecoveryAndEmailLinkErrors(response, setError, dispatch)
  }

  return <ExpiredEmailLinkForm isDisabled={isLoading} onSubmit={onSubmit} />
}
