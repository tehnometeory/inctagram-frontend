'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { passwordRecoverySchema, useValidEmailMutation } from '@/features'
import { zodResolver } from '@hookform/resolvers/zod'

import { ExpiredEmailLinkForm } from '../ExpiredEmailLinkForm'

export const PasswordRecovery = () => {
  const { control, handleSubmit, reset, setError, setValue, watch } = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(passwordRecoverySchema),
  })
  const [showModal, setShowModal] = useState(false)
  const [validEmail, { isLoading: isLoadingValidEmail }] = useValidEmailMutation()
  const handleCloseShowModal = () => {
    setShowModal(false)
    reset()
  }
  const handleSubmitDataForm = handleSubmit(async data => {
    try {
      await validEmail({ email: data.email }).unwrap()
      setShowModal(true)
      setValue('email', data.email)
    } catch {
      setError('email', { message: "User with this email doesn't exist", type: 'manual' })
    }
  })
  const email = watch('email')
  const isDisabled = !email || isLoadingValidEmail

  return (
    <ExpiredEmailLinkForm
      control={control}
      email={email}
      handleCloseShowModal={handleCloseShowModal}
      handleSubmitDataForm={handleSubmitDataForm}
      isDisabled={isDisabled}
      showModal={showModal}
    />
  )
}
