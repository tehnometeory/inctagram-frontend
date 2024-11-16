'use client'
import { useForm } from 'react-hook-form'

import { ControlledInput } from '@/shared/ui'
import { Button, Card, ReCaptcha } from '@rambo-react/ui-meteors'
import Link from 'next/link'

import s from './ForgotPassword.module.scss'

export default function ForgotPassword() {
  const { control } = useForm()

  return (
    <Card>
      <h1 className={s.title}>Forgot Password</h1>
      <form>
        <ControlledInput
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={'Epam@epam.com'}
        />
        <p className={s.text}>
          Enter your email address and we will send you further instructions{' '}
        </p>
        <Button fullWidth>Send Link</Button>
      </form>
      <Link className={s.signIn} href={'sign-in'}>
        Back to Sign In
      </Link>
      <ReCaptcha onChange={() => {}} siteKey={'www'} theme={'light'} />
    </Card>
  )
}
