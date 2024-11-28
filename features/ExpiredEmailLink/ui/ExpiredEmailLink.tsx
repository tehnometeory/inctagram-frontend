'use client'

import { UseFormSetError } from 'react-hook-form'

import { useResendConfirmationCodeMutation } from '@/features/ExpiredEmailLink/api'
import { ResendConfirmationCodeArgs } from '@/features/ExpiredEmailLink/api/types'
import {
  ErrorsMessagesResponse,
  ExpiredEmailLinkForm,
  handleNetworkError,
  handleServerError,
  useAppDispatch,
} from '@/shared'

export const ExpiredEmailLink = () => {
  const [resendConfirmationCode, { isLoading }] = useResendConfirmationCodeMutation()

  const dispatch = useAppDispatch()

  const onSubmit = async (
    data: ResendConfirmationCodeArgs,
    setError: UseFormSetError<ResendConfirmationCodeArgs>
  ) => {
    const response = await resendConfirmationCode(data)

    if (response.error) {
      if ('status' in response.error && response.error.status === 500) {
        handleServerError(dispatch)
      } else if ('status' in response.error && response.error.status === 'FETCH_ERROR') {
        handleNetworkError(dispatch)
      } else if ('data' in response.error) {
        const errorMessage = (response.error.data as ErrorsMessagesResponse).errorsMessages[0]
          .message

        if (errorMessage === 'User not found') {
          setError('email', {
            message:
              'User with this email are not registered in system or user email already confirmed',
          })
        }
      }

      return false
    } else {
      return true
    }
  }

  return <ExpiredEmailLinkForm isDisabled={isLoading} onSubmit={onSubmit} />
}
