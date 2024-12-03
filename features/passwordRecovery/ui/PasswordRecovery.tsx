'use client'

import { UseFormSetError } from 'react-hook-form'

import {
  ExpiredEmailLinkForm,
  ValidEmailResponse,
  handleRecoveryAndEmailLinkErrors,
  useAppDispatch,
  useValidEmailMutation,
} from '@/shared'

export const PasswordRecovery = () => {
  const [validEmail, { isLoading }] = useValidEmailMutation()

  const dispatch = useAppDispatch()

  const onSubmit = async (
    data: ValidEmailResponse,
    setError: UseFormSetError<ValidEmailResponse>
  ) => {
    const response = await validEmail(data)

    return handleRecoveryAndEmailLinkErrors(response, setError, dispatch)
  }

  return <ExpiredEmailLinkForm isDisabled={isLoading} onSubmit={onSubmit} />
}
