'use client'

import { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'

import { ControlledInput, FormContainer } from '@/shared'
import { Button, Github, Google } from '@rambo-react/ui-meteors'
import clsx from 'clsx'
import Link from 'next/link'

import s from './SignIn.module.scss'

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
    <FormContainer title={'Sign In'}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={s.socialContainer}>
            <Google
              className={s.formIcon}
              height={36}
              onClick={() => {
                triggerLoginViaGoogle(undefined)
              }}
              width={36}
            />

            <Github
              className={s.formIcon}
              fill={'white'}
              height={36}
              onClick={() => {
                triggerLoginViaGitHub(undefined)
              }}
              width={36}
            />
          </div>

          <div className={s.inputContainer}>
            <ControlledInput
              containerClassName={s.emailInput}
              label={'Email'}
              name={'email'}
              placeholder={'Epam@epam.com'}
            />
          </div>
          <div className={s.inputContainer}>
            <ControlledInput
              containerClassName={s.passwordInput}
              label={'Password'}
              name={'password'}
              placeholder={'*********'}
              type={'password'}
            />
          </div>
          <Link className={clsx(s.forgotPass, s.link)} href={'/auth/forgot-password'}>
            Forgot Password
          </Link>
          <Button
            className={s.button}
            disabled={!methods.formState.isValid || isLoading}
            fullWidth
            type={'submit'}
          >
            Sign In
          </Button>
          <p className={s.footerText}>{`Don't have an account?`}</p>
          <Link className={s.link} href={'/auth/sign-up'}>
            <Button className={s.button} fullWidth variant={'text'}>
              Sign Up
            </Button>
          </Link>
        </form>
      </FormProvider>
    </FormContainer>
  )
}
