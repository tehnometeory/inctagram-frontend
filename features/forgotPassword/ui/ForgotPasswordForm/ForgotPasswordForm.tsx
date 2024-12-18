'use client'

import { ControlledInput, FormContainer, SentEmailModal } from '@/shared'
import { Button, Recaptcha } from '@rambo-react/ui-meteors'
import Link from 'next/link'

import s from './ForgotPasswordForm.module.scss'

import { useForgotPassword } from '../../hooks'

export function ForgotPasswordForm() {
  const {
    control,
    email,
    handleCloseShowModal,
    handleReCaptcha,
    handleSubmitDataForm,
    isDisabled,
    reCaptchaStatus,
    sendLinkStatus,
    showModal,
  } = useForgotPassword()

  return (
    <FormContainer title={'Forgot Password'}>
      <form className={s.form} onSubmit={handleSubmitDataForm}>
        <ControlledInput
          containerClassName={s.inputContainer}
          control={control}
          label={'Email'}
          name={'email'}
          placeholder={'Epam@epam.com'}
        />
        <p className={s.text}>Enter your email address and we will send you further instructions</p>
        {sendLinkStatus === 'success' && (
          <p className={s.textSuccess}>
            The link has been sent by email. If you don’t receive an email send link again
          </p>
        )}
        <Button className={s.btnForm} disabled={isDisabled} fullWidth variant={'primary'}>
          {sendLinkStatus !== 'initial' ? 'Send Link Again' : 'Send Link'}
        </Button>
        <Link className={s.linkSignIn} href={'sign-in'}>
          <Button className={s.btnSignIn} fullWidth variant={'text'}>
            Back to Sign In
          </Button>
        </Link>
        {sendLinkStatus !== 'success' && (
          <div className={s.reCaptcha}>
            <Recaptcha
              label={'I’m not a robot'}
              onClick={handleReCaptcha}
              variant={reCaptchaStatus}
            />
          </div>
        )}
      </form>
      <SentEmailModal email={email} isOpen={showModal} onCloseHandler={handleCloseShowModal} />
    </FormContainer>
  )
}
