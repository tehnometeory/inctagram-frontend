'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { formWithEmailSchema } from '@/entities'
import { ErrorMessage, ExpiredEmailLinkForm, useFormErrorsHandler } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'

import { useResendConfirmationCodeMutation } from '..'

type FormValues = {
  email: string
}

export const ExpiredEmailLink = () => {
  const [showModal, setShowModal] = useState(false)
  const { control, handleSubmit, reset, setError, watch } = useForm<FormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(formWithEmailSchema),
  })

  const [resendConfirmationCode, { error, isLoading }] = useResendConfirmationCodeMutation()

  useFormErrorsHandler(error as ErrorMessage[], setError)

  const onSubmit = handleSubmit(async data => {
    if ('data' in (await resendConfirmationCode(data))) {
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
}
