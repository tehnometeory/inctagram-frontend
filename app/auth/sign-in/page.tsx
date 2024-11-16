'use client'

import { FormProvider, useForm } from 'react-hook-form'

import { ControlledInput } from '@/shared/ui'
import { Button, Card, Github, Google } from '@rambo-react/ui-meteors'
import { useRouter } from 'next/navigation'

import styles from './page.module.scss'

type FormValues = {
  email: string
  password: string
}

export default function SignIn() {
  const methods = useForm<FormValues>()
  const router = useRouter()

  const routeToSignUpHandler = () => {
    router.push('sign-up')
  }

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <section className={styles.signInContainer}>
      <Card>
        <h1 className={styles.title} style={{ textAlign: 'center' }}>
          Sign In
        </h1>
        <div className={styles.socialContainer}>
          <a href={'/#'}>
            <Google height={36} width={36} />
          </a>
          <a href={'#'}>
            <Github fill={'white'} height={36} width={36} />
          </a>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={styles.emailInput}>
              <ControlledInput
                control={methods.control}
                defaultValue={''}
                label={'Email'}
                name={'email'}
                placeholder={'Epam@epam.com'}
                rules={{ required: 'Email is required' }}
              />
            </div>
            <div className={styles.passwordInput}>
              <ControlledInput
                control={methods.control}
                defaultValue={''}
                label={'Password'}
                name={'password'}
                placeholder={'*********'}
                rules={{ required: 'Password is required' }}
                type={'password'}
              />
            </div>
            <a className={styles.forgotPass} href={'/auth/forgot-password'}>
              <p>Forgot Password</p>
            </a>
            <Button fullWidth type={'submit'}>
              Sign In
            </Button>
          </form>
        </FormProvider>
        <div>
          <p className={styles.footer}>{`Don't have an account?`}</p>
          <Button fullWidth onClick={routeToSignUpHandler} variant={'text'}>
            Sign Up
          </Button>
        </div>
      </Card>
    </section>
  )
}
