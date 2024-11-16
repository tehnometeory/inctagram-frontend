'use client'

import { useForm } from 'react-hook-form'

import { ControlledCheckbox, ControlledInput } from '@/shared/ui'
import { Button, Card, Github, Google } from '@rambo-react/ui-meteors/dist'
import Link from 'next/link'

import s from './SignUp.module.scss'

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
const PASSWORD_REG_EXP = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?/`~\-]).+$/

export const SignUp = () => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      agreement: false,
      email: '',
      password: '',
      passwordConfirmation: '',
      username: '',
    },
  })

  const onFormSubmit = (data: FormValues) => {
    console.log(data)
  }

  const passwordValue = watch('password')

  return (
    <Card>
      <form className={s.form} onSubmit={handleSubmit(onFormSubmit)}>
        <h1 className={s.header}>Sign Up</h1>

        <div className={s.inputs}>
          <div className={s.icons}>
            <Google height={36} width={36} />

            <Github fill={'#fff'} height={36} width={36} />
          </div>

          <ControlledInput
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
                message: `Use letters, numbers, and at least one special character`,
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
          <ControlledCheckbox control={control} name={'agreement'} required />
          <span>I agree to the</span>
          <Link href={'terms-of-service'}>Terms of Service</Link>
          <span>and</span>
          <Link href={'privacy-policy'}>Privacy Policy</Link>
        </div>

        <Button className={s.submitButton} fullWidth>
          Sign Up
        </Button>

        <span className={s.question}>Do you have an account?</span>

        <Link className={s.signIn} href={'sign-in'}>
          Sign In
        </Link>
      </form>
    </Card>
  )
}
