'use client'

import { UseFormSetError } from 'react-hook-form'

import { useResendConfirmationCodeMutation } from '@/features/ExpiredEmailLink/api'
import { ResendConfirmationCodeArgs } from '@/features/ExpiredEmailLink/api/types'
import { ExpiredEmailLinkForm, handleRecoveryAndEmailLinkErrors, useAppDispatch } from '@/shared'

export const ExpiredEmailLink = () => {
  const [resendConfirmationCode, { isLoading }] = useResendConfirmationCodeMutation()

  const dispatch = useAppDispatch()

  const onSubmit = async (
    data: ResendConfirmationCodeArgs,
    setError: UseFormSetError<ResendConfirmationCodeArgs>
  ) => {
    const response = await resendConfirmationCode(data)

    return handleRecoveryAndEmailLinkErrors(response, setError, dispatch)
  }

  return <ExpiredEmailLinkForm isDisabled={isLoading} onSubmit={onSubmit} />
}
