'use client'

import { FormProvider } from 'react-hook-form'

import { useSignIn } from '@/hooks/useSignIn'
import { ControlledInput } from '@/shared/ui'
import { Button, Card, Github, Google } from '@rambo-react/ui-meteors'

import styles from './page.module.scss'

export default function SignIn() {
  const {
    REGULAR_FOR_EMAIL,
    RULES_FOR_PASSWORD,
    githubAuth,
    googleAuth,
    methods,
    onSubmit,
    routeToSignUpHandler,
  } = useSignIn()

  return (
    <section className={styles.signInContainer}>
      <Card>
        <h1 className={styles.title} style={{ textAlign: 'center' }}>
          Sign In
        </h1>
        <div className={styles.socialContainer}>
          <Button as={'a'} onClick={googleAuth} variant={'text'}>
            <Google height={36} width={36} />
          </Button>
          <Button as={'a'} onClick={githubAuth} variant={'text'}>
            <Github fill={'white'} height={36} width={36} />
          </Button>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className={styles.InputContainer}>
              <ControlledInput
                containerClassName={styles.emailInput}
                control={methods.control}
                defaultValue={''}
                label={'Email'}
                name={'email'}
                placeholder={'Epam@epam.com'}
                rules={{
                  pattern: {
                    message: 'Invalid email',
                    value: REGULAR_FOR_EMAIL,
                  },
                  required: 'Email is required',
                }}
              />
            </div>
            <div className={styles.InputContainer}>
              <ControlledInput
                containerClassName={styles.passwordInput}
                control={methods.control}
                defaultValue={''}
                label={'Password'}
                name={'password'}
                placeholder={'*********'}
                rules={RULES_FOR_PASSWORD}
                type={'password'}
              />
            </div>
            <a className={styles.forgotPass} href={'/auth/forgot-password'}>
              Forgot Password
            </a>
            <Button disabled={!methods.formState.isValid} fullWidth type={'submit'}>
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
