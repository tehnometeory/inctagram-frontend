import { UseFormSetError } from 'react-hook-form'

import { ResendConfirmationCodeArgs } from '@/features/expiredEmailLink/api/types'
import {
  AppDispatch,
  ErrorsMessagesResponse,
  handleNetworkError,
  handleServerError,
} from '@/shared'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function handleRecoveryAndEmailLinkErrors(
  response: {
    error?: { data?: any; status?: number | string } | FetchBaseQueryError | SerializedError
  },
  setError: UseFormSetError<ResendConfirmationCodeArgs>,
  dispatch: AppDispatch
): boolean {
  if (response.error) {
    if ('status' in response.error && response.error.status === 500) {
      handleServerError(dispatch)
    } else if ('status' in response.error && response.error.status === 'FETCH_ERROR') {
      handleNetworkError(dispatch)
    } else if ('data' in response.error) {
      const errorMessage = (response.error.data as ErrorsMessagesResponse).errorsMessages[0].message

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
