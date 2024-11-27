'use client'

import { useForm } from 'react-hook-form'

import { handleNetworkError, handleServerError, useAppDispatch } from '@/shared'
import { ControlledCheckbox, ControlledInput } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Github, Google } from '@rambo-react/ui-meteors/dist'
import clsx from 'clsx'
import Link from 'next/link'
import { z } from 'zod'

import s from './SignUp.module.scss'

import {
  RegistrationErrorResponse,
  useLazyRegistrationViaGitHubQuery,
  useLazyRegistrationViaGoogleQuery,
  useRegistrationMutation,
} from '../api'
import { signUpSchema } from '../model'

type FormValues = z.infer<typeof signUpSchema>

type Props = {
  onSuccessfulSubmit: (email: string) => void
}

export const SignUp = ({ onSuccessfulSubmit }: Props) => {
  const dispatch = useAppDispatch()

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setError,
  } = useForm<FormValues>({
    defaultValues: {
      agreement: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  })

  const [registerUser] = useRegistrationMutation()
  const [triggerRegistrationViaGoogle] = useLazyRegistrationViaGoogleQuery()
  const [triggerRegistrationViaGitHub] = useLazyRegistrationViaGitHubQuery()

  const checkboxErrorMessage = errors.agreement?.message
  const { email: emailError, password: passwordError, username: usernameError } = errors

  const onFormSubmit = async ({ agreement, passwordConfirmation, ...userData }: FormValues) => {
    const response = await registerUser(userData)

    if (response.error) {
      if ('status' in response.error && response.error.status === 500) {
        handleServerError(dispatch)
      } else if ('status' in response.error && response.error.status === 'FETCH_ERROR') {
        handleNetworkError(dispatch)
      } else if ('data' in response.error) {
        const errorMessage = (response.error.data as RegistrationErrorResponse).errorsMessages[0]
          .message

        if (errorMessage === 'Username is already used') {
          setError('username', { message: 'User with this username is already registered' })
        }
      }
    } else {
      onSuccessfulSubmit(userData.email)
      reset()
    }
  }

  return (
    <Card className={s.card}>
      <form className={s.form} onSubmit={handleSubmit(onFormSubmit)}>
        <h1 className={s.header}>Sign Up</h1>

        <div>
          <div className={s.icons}>
            <Google
              height={36}
              onClick={() => triggerRegistrationViaGoogle(undefined)}
              width={36}
            />

            <Github
              fill={'#fff'}
              height={36}
              onClick={() => triggerRegistrationViaGitHub(undefined)}
              width={36}
            />
          </div>

          <ControlledInput
            containerClassName={clsx(!usernameError && s.inputContainer)}
            control={control}
            label={'Username'}
            name={'username'}
          />

          <ControlledInput
            containerClassName={clsx(!emailError && s.inputContainer)}
            control={control}
            label={'Email'}
            name={'email'}
          />

          <ControlledInput
            containerClassName={clsx(!passwordError && s.inputContainer)}
            control={control}
            label={'Password'}
            name={'password'}
            type={'password'}
          />

          <ControlledInput
            control={control}
            label={'Password confirmation'}
            name={'passwordConfirmation'}
            type={'password'}
          />
        </div>

        <div className={s.agreement}>
          <ControlledCheckbox control={control} name={'agreement'} />

          <div className={s.agreementText}>
            <span>I agree to the</span>
            <Link href={'terms-of-service'}>Terms of Service</Link>
            <span>and</span>
            <Link href={'privacy-policy'}>Privacy Policy</Link>
          </div>

          {checkboxErrorMessage && <p className={s.checkboxErrorMessage}>{checkboxErrorMessage}</p>}
        </div>

        <Button className={s.submitButton} disabled={isSubmitting} fullWidth>
          Sign Up
        </Button>

        <span className={s.question}>Do you have an account?</span>

        <Button type={'button'} variant={'text'}>
          <Link className={s.signIn} href={'sign-in'}>
            Sign In
          </Link>
        </Button>
      </form>
    </Card>
  )
}
