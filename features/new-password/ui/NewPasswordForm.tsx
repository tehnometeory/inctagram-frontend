'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { ControlledInput } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Card } from '@rambo-react/ui-meteors'
import { clsx } from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './NewPasswordForm.module.scss'

import { useSetPasswordMutation } from '../model/api'
import { NewPasswordFields } from '../model/types'
import { newPasswordSchema } from '../model/validation'

export const NewPasswordForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recoveryCode = searchParams.get('recoveryCode')
  const [setPassword, { error, isError, isLoading, isSuccess }] = useSetPasswordMutation()

  const methods = useForm<NewPasswordFields>({
    mode: 'onBlur',
    resolver: zodResolver(newPasswordSchema),
  })

  const onSubmitHandler = methods.handleSubmit(async (data: NewPasswordFields) => {
    if (recoveryCode) {
      await setPassword({ code: recoveryCode, password: data?.newPassword })
        .unwrap()
        .then(() => router.push('/auth/sign-in'))
    }
  })

  return (
    <Card>
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
          <Button className={s.button} fullWidth type={'submit'}>
            Create new password
          </Button>
        </form>
      </FormProvider>
      {!!error && <Alert message={(error as any).message} variant={'error'} />}
      {!!isSuccess && <Alert message={'Password changed successfully'} variant={'accepted'} />}
    </Card>
  )
}
