import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { setAlert } from '@/entities'
import {
  ErrorMessage,
  RoutesApp,
  useAppDispatch,
  useCheckTokenValidity,
  useFormErrorsHandler,
} from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSetPasswordMutation } from '../api'
import { NewPasswordFields, newPasswordSchema } from '../model'

export const useNewPassword = () => {
  const [setPassword, { error, isError, isLoading, isSuccess }] = useSetPasswordMutation()

  const methods = useForm<NewPasswordFields>({
    mode: 'onBlur',
    resolver: zodResolver(newPasswordSchema),
  })

  useFormErrorsHandler(error as ErrorMessage[], methods.setError)

  const dispatch = useAppDispatch()

  const { isRedirecting, router, token } = useCheckTokenValidity(
    RoutesApp.passwordRecovery,
    'recoveryCode'
  )

  useEffect(() => {
    if (isError) {
      dispatch(setAlert({ message: (error as any).message, type: 'error' }))
    }

    if (isSuccess) {
      dispatch(setAlert({ message: 'Password changed successfully', type: 'accepted' }))
    }
  }, [isError, isSuccess, error, dispatch])

  const onSubmitHandler = methods.handleSubmit(async (data: NewPasswordFields) => {
    const response = await setPassword({ code: token, password: data?.newPassword })

    if ('data' in response) {
      router.push(RoutesApp.signIn)
    }
  })

  return {
    isLoading,
    isRedirecting,
    methods,
    onSubmitHandler,
  }
}
