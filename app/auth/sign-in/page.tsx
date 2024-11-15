'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { ControlledInput } from '@/shared/ui'
import { Button, Card } from '@rambo-react/ui-meteors'

import styles from './page.module.scss'

type FormValues = {
  email: string
  password: string
}

export default function SignIn() {
  const methods = useForm<FormValues>()

  const onSubmit = (data: FormValues) => {
    console.log(1)
  }

  return (
    <section className={styles.signInContainer}>
      <Card>
        <h1 className={styles.title} style={{ textAlign: 'center' }}>
          Sign In
        </h1>
        <div
          style={{ alignItems: 'center', display: 'flex', gap: '20px', justifyContent: 'center' }}
        >
          <a href={''}>google</a>
          <a href={''}>gh</a>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={styles.emailInput}>
              <label htmlFor={'email'}>Email</label>
              <ControlledInput
                control={methods.control}
                defaultValue={''}
                name={'email'}
                placeholder={'Epam@epam.com'}
                rules={{ required: 'Email is required' }}
              />
            </div>
            <div className={styles.passwordInput}>
              <label htmlFor={'password'}>Password</label>
              <ControlledInput
                control={methods.control}
                defaultValue={''}
                name={'password'}
                placeholder={'*********'}
                rules={{ required: 'Password is required' }}
                type={'password'}
              />
            </div>
            <p className={styles.forgotPass}>Forgot Password</p>
            <Button fullWidth type={'submit'}>
              Sign In
            </Button>
          </form>
        </FormProvider>
        <div>
          <p className={styles.footer}>{`Don't have an account?`}</p>
          <Button fullWidth variant={'text'}>
            Sign Up
          </Button>
        </div>
      </Card>
    </section>
  )
}
