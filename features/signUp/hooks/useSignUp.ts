import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ErrorMessage, useFormErrorsHandler } from '@/shared'
import { useOAuthRedirect } from '@/shared/hooks/useOAuthRedirect'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useRegistrationMutation } from '../api'
import { signUpSchema } from '../model'

type FormValues = z.infer<typeof signUpSchema>

export const useSignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      agreement: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const [registerUser, { error }] = useRegistrationMutation()
  const redirectOnGoogle = useOAuthRedirect('google')
  const redirectOnGitHub = useOAuthRedirect('github')

  useFormErrorsHandler(error as ErrorMessage[], setError)

  const checkboxErrorMessage = errors.agreement?.message
  const { email: emailError, password: passwordError, username: usernameError } = errors

  const onFormSubmit = handleSubmit(
    async ({ agreement, passwordConfirmation, ...userData }: FormValues) => {
      if ('data' in (await registerUser(userData))) {
        setEmail(userData.email)
        setIsModalOpen(true)
        reset()
      }
    }
  )

  const onModalCloseHandler = () => {
    setIsModalOpen(false)
  }

  return {
    checkboxErrorMessage,
    control,
    email,
    emailError,
    isModalOpen,
    isSubmitting,
    onFormSubmit,
    onModalCloseHandler,
    passwordError,
    redirectOnGitHub,
    redirectOnGoogle,
    usernameError,
  }
}
