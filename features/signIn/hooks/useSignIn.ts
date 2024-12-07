import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { setAccessToken, setIsAuthorized } from '@/entities'
import {
  handleNetworkError,
  handleServerError,
  useAppDispatch,
  useAppSelector,
  useOAuthRedirect,
} from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [login, { isLoading }] = useLoginMutation()
  const redirectOnGoogle = useOAuthRedirect('google')
  const redirectOnGitHub = useOAuthRedirect('github')

  useEffect(() => {
    if (token) {
      router.push('/home')
    }
  }, [token, router])

  const onSubmit = async (data: FormValues) => {
    const response = await login(data)

    if (response.error) {
      if ('status' in response.error && response.error.status === 500) {
        handleServerError(dispatch)
      } else if ('data' in response.error) {
        methods.setError('password', {
          message: 'The email or password are incorrect. Try again please',
        })
      } else if ('status' in response.error && response.error.status === 'FETCH_ERROR') {
        handleNetworkError(dispatch)
      }
    } else if ('accessToken' in response.data) {
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
