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

export const SignUp = () => {
  const { control, handleSubmit } = useForm<FormValues>({
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
            rules={{ maxLength: 30, minLength: 6 }}
          />

          <ControlledInput control={control} label={'Email'} name={'email'} type={'email'} />

          <ControlledInput
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
