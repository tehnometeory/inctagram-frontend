'use client'

import { useForm } from 'react-hook-form'

import { ControlledCheckbox, ControlledInput } from '@/shared/ui'
import { Button, Card, Github, Google } from '@rambo-react/ui-meteors/dist'
import clsx from 'clsx'
import Link from 'next/link'

import s from './SignUp.module.scss'

import {
  RegistrationErrorResponse,
  useLazyRegistrationViaGitHubQuery,
  useLazyRegistrationViaGoogleQuery,
  useRegistrationMutation,
} from '../api'

type FormValues = {
  agreement: boolean
  email: string
  password: string
  passwordConfirmation: string
  username: string
}

const EMAIL_REG_EXP =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
const USERNAME_REG_EXP = /^[a-zA-Z0-9_-]{6,30}$/
const PASSWORD_REG_EXP = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?/`~\\-]).+$/

type Props = {
  onSuccessfulSubmit: (email: string) => void
}

export const SignUp = ({ onSuccessfulSubmit }: Props) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setError,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      agreement: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
    },
    mode: 'onBlur',
  })

  const [registerUser] = useRegistrationMutation()
  const [triggerRegistrationViaGoogle] = useLazyRegistrationViaGoogleQuery()
  const [triggerRegistrationViaGitHub] = useLazyRegistrationViaGitHubQuery()

  const passwordValue = watch('password')
  const checkboxErrorMessage = errors.agreement?.message
  const { email: emailError, password: passwordError, username: usernameError } = errors

  const onFormSubmit = async ({ agreement, passwordConfirmation, ...userData }: FormValues) => {
    const response = await registerUser(userData)

    if (response.error) {
      if ('data' in response.error) {
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
            rules={{
              maxLength: {
                message: 'Maximum number of characters 30',
                value: 30,
              },
              minLength: {
                message: 'Minimum number of characters 6',
                value: 6,
              },
              pattern: {
                message: "Invalid characters. Only letters, numbers, '_' and '-'",
                value: USERNAME_REG_EXP,
              },
              required: {
                message: 'This field is required',
                value: true,
              },
            }}
          />

          <ControlledInput
            containerClassName={clsx(!emailError && s.inputContainer)}
            control={control}
            label={'Email'}
            name={'email'}
            rules={{
              pattern: {
                message: 'The email must match the format example@example.com',
                value: EMAIL_REG_EXP,
              },
              required: {
                message: 'This field is required',
                value: true,
              },
            }}
          />

          <ControlledInput
            containerClassName={clsx(!passwordError && s.inputContainer)}
            control={control}
            label={'Password'}
            name={'password'}
            rules={{
              maxLength: {
                message: 'Maximum number of characters 20',
                value: 20,
              },
              minLength: {
                message: 'Minimum number of characters 6',
                value: 6,
              },
              pattern: {
                message: `Password must contain a-z, A-Z, 0-9, ! " # $ % & ' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _\` { | } ~`,
                value: PASSWORD_REG_EXP,
              },
              required: {
                message: 'This field is required',
                value: true,
              },
            }}
            type={'password'}
          />

          <ControlledInput
            control={control}
            label={'Password confirmation'}
            name={'passwordConfirmation'}
            rules={{
              required: {
                message: 'This field is required',
                value: true,
              },
              validate: value => value === passwordValue || 'The passwords must match',
            }}
            type={'password'}
          />
        </div>

        <div className={s.agreement}>
          <ControlledCheckbox
            control={control}
            name={'agreement'}
            rules={{
              required: {
                message: 'This field is required',
                value: true,
              },
            }}
          />

          <div className={s.agreementText}>
            <span>I agree to the</span>
            <Link href={'terms-of-service'}>Terms of Service</Link>
            <span>and</span>
            <Link href={'privacy-policy'}>Privacy Policy</Link>
          </div>

          <p className={clsx(s.checkboxErrorMessage, checkboxErrorMessage && s.show)}>
            {checkboxErrorMessage}
          </p>
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
