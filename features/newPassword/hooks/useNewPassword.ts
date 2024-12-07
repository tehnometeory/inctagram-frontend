import { useForm } from 'react-hook-form'

import { setAlert } from '@/entities'
import { RoutesApp, useAppDispatch, useCheckTokenValidity } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'

import { useSetPasswordMutation } from '../api'
import { NewPasswordFields, newPasswordSchema } from '../model'

export const useNewPassword = () => {
  const [setPassword, { error, isError, isLoading, isSuccess }] = useSetPasswordMutation()
  const dispatch = useAppDispatch()
  const { isRedirecting, router, token } = useCheckTokenValidity(
    RoutesApp.passwordRecovery,
    'recoveryCode'
  )

  const methods = useForm<NewPasswordFields>({
    mode: 'onBlur',
    resolver: zodResolver(newPasswordSchema),
  })

  if (isError) {
    dispatch(setAlert({ message: (error as any).message, type: 'error' }))
  }

  if (isSuccess) {
    dispatch(setAlert({ message: 'Password changed successfully', type: 'accepted' }))
  }

  const onSubmitHandler = methods.handleSubmit(async (data: NewPasswordFields) => {
    await setPassword({ code: token, password: data?.newPassword })
      .unwrap()
      .then(() => router.push(RoutesApp.signIn))
  })

  return {
    isLoading,
    isRedirecting,
    methods,
    onSubmitHandler,
  }
}
