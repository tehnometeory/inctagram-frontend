'use client'

import { UseFormSetError } from 'react-hook-form'

import {
  ExpiredEmailLinkForm,
  ResetPasswordResponse,
  handleRecoveryAndEmailLinkErrors,
  useAppDispatch,
  useResetPasswordMutation,
} from '@/shared'

export const PasswordRecovery = () => {
  const [validEmail, { isLoading }] = useResetPasswordMutation()

  const dispatch = useAppDispatch()

  const onSubmit = async (
    data: ResetPasswordResponse,
    setError: UseFormSetError<ResetPasswordResponse>
  ) => {
    const response = await validEmail(data)

    return handleRecoveryAndEmailLinkErrors(response, setError, dispatch)
  }

  return <ExpiredEmailLinkForm isDisabled={isLoading} onSubmit={onSubmit} />
}