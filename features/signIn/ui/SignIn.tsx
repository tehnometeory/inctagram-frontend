'use client'

import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

import { ControlledInput } from '@/shared'
import { Button, Card, Github, Google } from '@rambo-react/ui-meteors'
import Link from 'next/link'

import styles from './SignIn.module.scss'

import { useSignIn } from '../hooks'

export const SignIn = () => {
  const {
    isLoading,
    methods,
    onSubmit,
    router,
    token,
    triggerLoginViaGitHub,
    triggerLoginViaGoogle,
  } = useSignIn()

  useEffect(() => {
    if (token) {
      router.push('/home')
    }
  }, [token, router])

  return (
    <FormProvider {...methods}>
      <Card>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h1 className={styles.title}>Sign In</h1>
          <div className={styles.socialContainer}>
            <Google
              className={styles.formIcon}
              height={36}
              onClick={() => {
                triggerLoginViaGoogle(undefined)
              }}
              width={36}
            />

            <Github
              className={styles.formIcon}
              fill={'white'}
              height={36}
              onClick={() => {
                triggerLoginViaGitHub(undefined)
              }}
              width={36}
            />
          </div>

          <div className={styles.inputContainer}>
            <ControlledInput
              containerClassName={styles.emailInput}
              control={methods.control}
              label={'Email'}
              name={'email'}
              placeholder={'Epam@epam.com'}
            />
          </div>
          <div className={styles.inputContainer}>
            <ControlledInput
              containerClassName={styles.passwordInput}
              control={methods.control}
              label={'Password'}
              name={'password'}
              placeholder={'*********'}
              type={'password'}
            />
          </div>
          <Link className={styles.forgotPass} href={'/auth/forgot-password'}>
            Forgot Password
          </Link>
          <Button disabled={!methods.formState.isValid || isLoading} fullWidth type={'submit'}>
            Sign In
          </Button>
          <div className={styles.signIn__footer}>
            <p className={styles.footer}>{`Don't have an account?`}</p>
            <Button className={styles.signUpButton} fullWidth variant={'text'}>
              <Link href={'/auth/sign-up'}>Sign Up</Link>
            </Button>
          </div>
        </form>
      </Card>
    </FormProvider>
  )
}