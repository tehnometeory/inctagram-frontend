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
    triggerRegistrationViaGitHub,
    triggerRegistrationViaGoogle,
    usernameError,
  } = useSignUp()

  return (
    <>
      <Card className={s.card}>
        <form className={s.form} onSubmit={onFormSubmit}>
          <h1 className={s.header}>Sign Up</h1>

          <div>
            <div className={s.icons}>
              <Google
                height={36}
                onClick={() => triggerRegistrationViaGoogle(undefined)}
                width={36}
              />

              <Github
                fill={'#fff'}
                height={36}
                onClick={() => triggerRegistrationViaGitHub(undefined)}
                width={36}
              />
            </div>

            <ControlledInput
              containerClassName={clsx(!usernameError && s.inputContainer)}
              control={control}
              label={'Username'}
              name={'username'}
            />

            <ControlledInput
              containerClassName={clsx(!emailError && s.inputContainer)}
              control={control}
              label={'Email'}
              name={'email'}
            />

            <ControlledInput
              containerClassName={clsx(!passwordError && s.inputContainer)}
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

          <Button type={'button'} variant={'text'}>
            <Link className={s.signIn} href={'sign-in'}>
              Sign In
            </Link>
          </Button>
        </form>
      </Card>

      <SentEmailModal email={email} isOpen={isModalOpen} onCloseHandler={onModalCloseHandler} />
    </>
  )
}
