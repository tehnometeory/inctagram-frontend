'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { setAlert } from '@/entities'
import { ControlledInput, useAppDispatch, useCheckTokenValidity } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card } from '@rambo-react/ui-meteors'
import { clsx } from 'clsx'

import s from './NewPasswordForm.module.scss'

import { useSetPasswordMutation } from '../api/api'
import { NewPasswordFields } from '../model/types'
import { newPasswordSchema } from '../model/validation'

export const NewPasswordForm = () => {
  const [setPassword, { error, isError, isLoading, isSuccess }] = useSetPasswordMutation()
  const dispatch = useAppDispatch()
  const { isRedirecting, router, token } = useCheckTokenValidity(
    '/auth/expired-email-link',
    'recoveryCode'
  )

  const methods = useForm<NewPasswordFields>({
    mode: 'onBlur',
    resolver: zodResolver(newPasswordSchema),
  })

  if (isRedirecting) {
    return null
  }

  const onSubmitHandler = methods.handleSubmit(async (data: NewPasswordFields) => {
    await setPassword({ code: token, password: data?.newPassword })
      .unwrap()
      .then(() => router.push('/auth/sign-in'))
  })

  if (isError) {
    dispatch(setAlert({ message: (error as any).message, type: 'error' }))
  }

  if (isSuccess) {
    dispatch(setAlert({ message: 'Password changed successfully', type: 'accepted' }))
  }

  return (
    <Card className={s.card}>
      <h1 className={s.title}>Create New Password</h1>
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={onSubmitHandler}>
          <ControlledInput
            containerClassName={clsx(methods.formState.errors?.newPassword || s.margin)}
            defaultValue={''}
            label={'New password'}
            name={'newPassword'}
            type={'password'}
          />
          <ControlledInput
            defaultValue={''}
            label={'Password confirmation'}
            name={'passwordConfirmation'}
            type={'password'}
          />
          <p className={s.helper}>Your password must be between 6 and 20 characters</p>
          <Button className={s.button} disabled={isLoading} fullWidth type={'submit'}>
            Create new password
          </Button>
        </form>
      </FormProvider>
    </Card>
  )
}
