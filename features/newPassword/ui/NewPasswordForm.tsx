'use client'

import { FormProvider } from 'react-hook-form'

import { ControlledInput, withAuthRedirect } from '@/shared'
import { Button, Card } from '@rambo-react/ui-meteors'
import { clsx } from 'clsx'

import s from './NewPasswordForm.module.scss'

import { useNewPassword } from '../hooks'

export const NewPasswordForm = withAuthRedirect(() => {
  const { isLoading, isRedirecting, methods, onSubmitHandler } = useNewPassword()

  if (isRedirecting) {
    return null
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
            placeholder={'******************'}
            type={'password'}
          />
          <ControlledInput
            defaultValue={''}
            label={'Password confirmation'}
            name={'passwordConfirmation'}
            placeholder={'******************'}
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
})
