'use client'

import { FormProvider } from 'react-hook-form'

import { ControlledInput, FormContainer } from '@/shared'
import { Button } from '@rambo-react/ui-meteors'
import { clsx } from 'clsx'

import s from './NewPassword.module.scss'

import { useNewPassword } from '../hooks'

export const NewPassword = () => {
  const { isLoading, isRedirecting, methods, onSubmitHandler } = useNewPassword()

  if (isRedirecting) {
    return null
  }

  return (
    <FormContainer title={'Create New Password'}>
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
    </FormContainer>
  )
}
