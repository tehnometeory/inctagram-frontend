import { useForm } from 'react-hook-form'

import { setAccessToken } from '@/entities'
import { handleNetworkError, handleServerError, useAppDispatch, useAppSelector } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { useLazyLoginViaGitHubQuery, useLazyLoginViaGoogleQuery, useLoginMutation } from '../api'
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
  const [triggerLoginViaGoogle] = useLazyLoginViaGoogleQuery()
  const [triggerLoginViaGitHub] = useLazyLoginViaGitHubQuery()

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

      methods.reset()
    }
  }

  return {
    isLoading,
    methods,
    onSubmit,
    router,
    token,
    triggerLoginViaGitHub,
    triggerLoginViaGoogle,
  }
}