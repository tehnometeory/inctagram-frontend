'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { formWithEmailSchema } from '@/entities'
import {
  ErrorsMessagesResponse,
  ExpiredEmailLinkForm,
  handleNetworkError,
  handleServerError,
  useAppDispatch,
  withAuthRedirect,
} from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'

import { useResendConfirmationCodeMutation } from '..'

type FormValues = {
  email: string
}

export const ExpiredEmailLink = withAuthRedirect(() => {
  const [showModal, setShowModal] = useState(false)
  const { control, handleSubmit, reset, setError, watch } = useForm<FormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(formWithEmailSchema),
  })

  const [resendConfirmationCode, { isLoading }] = useResendConfirmationCodeMutation()

  const dispatch = useAppDispatch()

  const onSubmit = handleSubmit(async data => {
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
    } else {
      setShowModal(true)
    }
  })
  const email = watch('email')
  const handleCloseShowModal = () => {
    reset()
    setShowModal(false)
  }

  return (
    <ExpiredEmailLinkForm
      control={control}
      email={email}
      handleCloseShowModal={handleCloseShowModal}
      isDisabled={isLoading}
      onSubmitHandler={onSubmit}
      showInput
      showModal={showModal}
    />
  )
})
