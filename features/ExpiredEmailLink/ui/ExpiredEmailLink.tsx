'use client'
import { useResendConfirmationCodeMutation } from '@/features/ExpiredEmailLink/api'
import { ResendConfirmationCodeArgs } from '@/features/ExpiredEmailLink/api/types'
import {
  ExpiredEmailLinkForm,
  handleNetworkError,
  handleServerError,
  useAppDispatch,
} from '@/shared'

export const ExpiredEmailLink = () => {
  const [resendConfirmationCode, { isLoading }] = useResendConfirmationCodeMutation()

  const dispatch = useAppDispatch()

  const onSubmit = async (data: ResendConfirmationCodeArgs) => {
    const response = await resendConfirmationCode(data)

    if (response.error) {
      if ('status' in response.error && response.error.status === 500) {
        handleServerError(dispatch)
      } else if ('status' in response.error && response.error.status === 'FETCH_ERROR') {
        handleNetworkError(dispatch)
      } else if ('data' in response.error) {
      }

      return false
    } else {
      return true
    }
  }

  return <ExpiredEmailLinkForm isDisabled={isLoading} onSubmit={onSubmit} />
}
