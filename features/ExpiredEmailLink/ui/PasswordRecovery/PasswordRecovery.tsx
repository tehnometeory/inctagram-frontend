'use client'

import { ValidEmailArgs } from '@/features/ExpiredEmailLink/api/types'
import { useValidEmailMutation } from '@/features/ForgotPassword'
import {
  ExpiredEmailLinkForm,
  handleNetworkError,
  handleServerError,
  useAppDispatch,
} from '@/shared'

export const PasswordRecovery = () => {
  const [validEmail, { isLoading }] = useValidEmailMutation()

  const dispatch = useAppDispatch()

  const onSubmit = async (data: ValidEmailArgs) => {
    const response = await validEmail(data)

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
