'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useResendEmailMutation } from '@/features'
import { ExpiredEmailLinkForm } from '@/features/ExpiredEmailLink/ui'

export const ExpiredEmailLink = () => {
  const { control, handleSubmit, reset, setError, setValue, watch } = useForm({
    defaultValues: { email: '' },
  })
  const [showModal, setShowModal] = useState(false)
  const [resendEmail, { isLoading: isLoadingResendEmail }] = useResendEmailMutation()
  const handleCloseShowModal = () => {
    setShowModal(false)
    reset()
  }
  const handleSubmitDataForm = handleSubmit(async data => {
    try {
      await resendEmail({ email: data.email }).unwrap()
      setShowModal(true)
      setValue('email', data.email)
    } catch {
      debugger
      setError('email', { message: "User with this email doesn't exist", type: 'manual' })
    }
  })
  const email = watch('email')

  return (
    <ExpiredEmailLinkForm
      control={control}
      email={email}
      handleCloseShowModal={handleCloseShowModal}
      handleSubmitDataForm={handleSubmitDataForm}
      showModal={showModal}
    />
  )
}
