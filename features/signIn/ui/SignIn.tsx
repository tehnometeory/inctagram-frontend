'use client'

import { FormProvider } from 'react-hook-form'

import { ControlledInput, FormContainer, withAuthRedirect } from '@/shared'
import { Button, Github, Google } from '@rambo-react/ui-meteors'
import clsx from 'clsx'
import Link from 'next/link'

import s from './SignIn.module.scss'

import { useSignIn } from '../hooks'

export const SignIn = withAuthRedirect(() => {
  const { isLoading, methods, onSubmit, redirectOnGitHub, redirectOnGoogle } = useSignIn()

  return (
    <FormContainer title={'Sign In'}>
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={s.socialContainer}>
            <Google className={s.formIcon} height={36} onClick={redirectOnGoogle} width={36} />

            <Github
              className={s.formIcon}
              fill={'white'}
              height={36}
              onClick={redirectOnGitHub}
              width={36}
            />
          </div>

          <ControlledInput
            containerClassName={clsx(methods.formState.errors?.email || s.margin)}
            label={'Email'}
            name={'email'}
            placeholder={'Epam@epam.com'}
          />

          <ControlledInput
            label={'Password'}
            name={'password'}
            placeholder={'*********'}
            type={'password'}
          />

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
})
