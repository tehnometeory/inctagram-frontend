'use client'

import { UseFormSetError } from 'react-hook-form'

import {
  ExpiredEmailLinkForm,
  ResendConfirmationCodeArgs,
  handleRecoveryAndEmailLinkErrors,
  useAppDispatch,
  withAuthRedirect,
} from '@/shared'

import { useResendConfirmationCodeMutation } from '..'

export const ExpiredEmailLink = withAuthRedirect(() => {
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
})
