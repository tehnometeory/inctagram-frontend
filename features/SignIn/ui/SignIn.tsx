'use client'

import { FormProvider } from 'react-hook-form'

import { useSignIn } from '@/features/SignIn/hooks/useSignIn'
import { ControlledInput } from '@/shared/ui'
import { Button, Card, Github, Google } from '@rambo-react/ui-meteors'

import styles from './SignIn.module.scss'

export const SignIn = () => {
  const { isLoading, methods, onSubmit, triggerLoginViaGitHub, triggerLoginViaGoogle } = useSignIn()

  return (
    <section className={styles.signInContainer}>
      <Card>
        <h1 className={styles.title} style={{ textAlign: 'center' }}>
          Sign In
        </h1>
        <div className={styles.socialContainer}>
          <Button
            as={'a'}
            onClick={() => {
              triggerLoginViaGoogle(undefined)
            }}
            variant={'text'}
          >
            <Google height={36} width={36} />
          </Button>
          <Button
            as={'a'}
            onClick={() => {
              triggerLoginViaGitHub(undefined)
            }}
            variant={'text'}
          >
            <Github fill={'white'} height={36} width={36} />
          </Button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={styles.InputContainer}>
              <ControlledInput
                containerClassName={styles.emailInput}
                control={methods.control}
                label={'Email'}
                name={'email'}
                placeholder={'Epam@epam.com'}
              />
            </div>
            <div className={styles.InputContainer}>
              <ControlledInput
                containerClassName={styles.passwordInput}
                control={methods.control}
                label={'Password'}
                name={'password'}
                placeholder={'*********'}
                type={'password'}
              />
            </div>
            <a className={styles.forgotPass} href={'/auth/forgot-password'}>
              Forgot Password
            </a>
            <Button disabled={!methods.formState.isValid || isLoading} fullWidth type={'submit'}>
              Sign In
            </Button>
          </form>
        </FormProvider>
        <div className={styles.signIn__footer}>
          <p className={styles.footer}>{`Don't have an account?`}</p>
          <Button
            as={'a'}
            className={styles.signUp_button}
            fullWidth
            href={'/auth/sign-up'}
            variant={'text'}
          >
            Sign Up
          </Button>
        </div>
      </Card>
    </section>
  )
}
