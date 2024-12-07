'use client'

import { ControlledCheckbox, ControlledInput, SentEmailModal } from '@/shared'
import { Button, Card, Github, Google } from '@rambo-react/ui-meteors/dist'
import clsx from 'clsx'
import Link from 'next/link'

import s from './SignUp.module.scss'

import { useSignUp } from '../hooks'

export const SignUp = () => {
  const {
    checkboxErrorMessage,
    control,
    email,
    emailError,
    isModalOpen,
    isSubmitting,
    onFormSubmit,
    onModalCloseHandler,
    passwordError,
    redirectOnGitHub,
    redirectOnGoogle,
    usernameError,
  } = useSignUp()

  return (
    <>
      <Card className={s.card}>
        <form className={s.form} onSubmit={onFormSubmit}>
          <h1 className={s.header}>Sign Up</h1>

          <div>
            <div className={s.icons}>
              <Google height={36} onClick={redirectOnGoogle} width={36} />

              <Github fill={'#fff'} height={36} onClick={redirectOnGitHub} width={36} />
            </div>

            <ControlledInput
              containerClassName={clsx(!usernameError && s.inputContainer)}
              control={control}
              label={'Username'}
              name={'username'}
              placeholder={'Epam11'}
            />

            <ControlledInput
              containerClassName={clsx(!emailError && s.inputContainer)}
              control={control}
              label={'Email'}
              name={'email'}
              placeholder={'Epam@epam.com'}
            />

            <ControlledInput
              containerClassName={clsx(!passwordError && s.inputContainer)}
              control={control}
              label={'Password'}
              name={'password'}
              placeholder={'******************'}
              type={'password'}
            />

            <ControlledInput
              control={control}
              label={'Password confirmation'}
              name={'passwordConfirmation'}
              placeholder={'******************'}
              type={'password'}
            />
          </div>

          <div className={s.agreement}>
            <ControlledCheckbox control={control} name={'agreement'} />

            <div className={s.agreementText}>
              <span>I agree to the</span>
              <Link href={'terms-of-service'}>Terms of Service</Link>
              <span>and</span>
              <Link href={'privacy-policy'}>Privacy Policy</Link>
            </div>

            {checkboxErrorMessage && (
              <p className={s.checkboxErrorMessage}>{checkboxErrorMessage}</p>
            )}
          </div>

          <Button className={s.submitButton} disabled={isSubmitting} fullWidth>
            Sign Up
          </Button>

          <span className={s.question}>Do you have an account?</span>

          <Link className={s.signIn} href={'sign-in'}>
            <Button type={'button'} variant={'text'}>
              Sign In
            </Button>
          </Link>
        </form>
      </Card>

      <SentEmailModal email={email} isOpen={isModalOpen} onCloseHandler={onModalCloseHandler} />
    </>
  )
}
