import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  ErrorsMessagesResponse,
  handleNetworkError,
  handleServerError,
  useAppDispatch,
} from '@/shared'
import { useOAuthRedirect } from '@/shared/hooks/useOAuthRedirect'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useRegistrationMutation } from '../api'
import { signUpSchema } from '../model'

type FormValues = z.infer<typeof signUpSchema>

export const useSignUp = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')

  const dispatch = useAppDispatch()

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

  const [registerUser] = useRegistrationMutation()
  const redirectOnGoogle = useOAuthRedirect('google')
  const redirectOnGitHub = useOAuthRedirect('github')

  const checkboxErrorMessage = errors.agreement?.message
  const { email: emailError, password: passwordError, username: usernameError } = errors

  const onFormSubmit = handleSubmit(
    async ({ agreement, passwordConfirmation, ...userData }: FormValues) => {
      const response = await registerUser(userData)

      if (response.error) {
        if ('status' in response.error && response.error.status === 500) {
          handleServerError(dispatch)
        } else if ('status' in response.error && response.error.status === 'FETCH_ERROR') {
          handleNetworkError(dispatch)
        } else if ('data' in response.error) {
          const errorMessage = (response.error.data as ErrorsMessagesResponse).errorsMessages[0]
            .message

          if (errorMessage === 'Username is already used') {
            setError('username', { message: 'User with this username is already registered' })
          }
        }
      } else {
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
