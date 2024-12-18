import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { setAccessToken, setIsAuthorized } from '@/entities'
import {
  ErrorMessage,
  useAppDispatch,
  useAppSelector,
  useFormErrorsHandler,
  useNRouter,
  useOAuthRedirect,
} from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useLoginMutation } from '../api'
import { signInSchema } from '../model'

type FormValues = z.infer<typeof signInSchema>

export const useSignIn = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  })

  const token = useAppSelector(state => state.auth.accessToken)
  const router = useNRouter()
  const dispatch = useAppDispatch()

  const [login, { error, isLoading }] = useLoginMutation()
  const redirectOnGoogle = useOAuthRedirect('google')
  const redirectOnGitHub = useOAuthRedirect('github')

  useFormErrorsHandler(error as ErrorMessage[], methods.setError)

  useEffect(() => {
    if (token) {
      router.push('/home')
    }
  }, [token, router])

  const onSubmit = async (data: FormValues) => {
    const response = await login(data)

    if (response.data && 'accessToken' in response.data) {
      dispatch(setAccessToken(response.data.accessToken))
      dispatch(setIsAuthorized(true))
      methods.reset()
    }
  }

  return {
    isLoading,
    methods,
    onSubmit,
    redirectOnGitHub,
    redirectOnGoogle,
  }
}
