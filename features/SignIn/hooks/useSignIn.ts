import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useLazyLoginViaGitHubQuery, useLazyLoginViaGoogleQuery, useLoginMutation } from '../api'
import { signInSchema } from '../model/validation'

export const useSignIn = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signInSchema),
  })

  type FormValues = z.infer<typeof signInSchema>

  const [login, { isLoading }] = useLoginMutation()
  const [triggerLoginViaGoogle] = useLazyLoginViaGoogleQuery()
  const [triggerLoginViaGitHub] = useLazyLoginViaGitHubQuery()

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await login(data)

      if (response.error) {
        if ('data' in response.error) {
          methods.setError('password', {
            message: 'The email or password are incorrect. Try again please',
          })
        } else {
          methods.setError('password', {
            message: 'Check your internet connection',
          })
        }
      }
    } catch (e: any) {
      methods.setError('password', {
        message: 'Unknown error',
      })
    }
  }

  return {
    isLoading,
    methods,
    onSubmit,
    triggerLoginViaGitHub,
    triggerLoginViaGoogle,
  }
}
