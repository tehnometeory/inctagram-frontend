'use client'
import { FormEvent, useRef, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'

import { useResendEmailMutation, useValidEmailMutation } from '@/features/ForgotPassword/model'
import { ControlledInput, SentEmailModal } from '@/shared/ui'
import { Button, Recaptcha } from '@rambo-react/ui-meteors'
import Link from 'next/link'
import { Simulate } from 'react-dom/test-utils'

import s from './FormForgotPassword.module.scss'

const EMAIL_REG_EXP =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

export function FormForgotPassword() {
  const [showModal, setShowModal] = useState(false)
  const [recaptchaValue, setRecaptchaValue] = useState('')
  const [sendLinkStatus, setSendLinkStatus] = useState<'initial' | 'success'>('initial')
  const [reCaptchaStatus, setReCaptchaStatus] = useState<
    'checked' | 'expired' | 'initial' | 'loading' | 'withError'
  >('initial')

  const { control, handleSubmit, reset, setError, setValue, watch } = useForm({
    defaultValues: { email: '' },
  })
  const [validEmail, { isLoading: isLoadingValidEmail }] = useValidEmailMutation()
  const [resendEmail, { isLoading: isLoadingResendEmail }] = useResendEmailMutation()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const formRef = useRef<HTMLFormElement>(null)
  const handleCloseShowModal = () => {
    setShowModal(false)
    reset()
  }

  const handleSubmitDataForm = handleSubmit(async data => {
    try {
      await validEmail({ email: data.email, recaptchaValue }).unwrap()
      setSendLinkStatus('success')
      setValue('email', data.email)
      setShowModal(true)
    } catch {
      setError('email', { message: "User with this email doesn't exist", type: 'manual' })
      setReCaptchaStatus('expired')
    }
  })

  const handleSubmitReCaptchaForm = async (event: FormEvent) => {
    event.preventDefault()
    setReCaptchaStatus('loading')

    if (!executeRecaptcha) {
      setError('email', { message: 'Execute recaptcha not yet available', type: 'manual' })

      return
    }

    const token = await executeRecaptcha('password_recovery')

    setRecaptchaValue(token)
    setReCaptchaStatus('checked')
  }

  const handleResendEmail = async (email: string) => {
    try {
      await resendEmail({ email }).unwrap()
      setShowModal(true)
    } catch {
      setError('email', { message: "User with this email doesn't exist", type: 'manual' })
    }
  }
  const email = watch('email')
  const isDisabled = !email || reCaptchaStatus !== 'checked'

  return (
    <>
      <h1 className={s.title}>Forgot Password</h1>
      {isLoadingValidEmail || isLoadingResendEmail ? (
        <div>...Loading</div>
      ) : (
        <div className={s.formContainer}>
          <form onSubmit={handleSubmitDataForm} ref={formRef}>
            <ControlledInput
              control={control}
              label={'Email'}
              name={'email'}
              placeholder={'Epam@epam.com'}
              rules={{
                pattern: {
                  message: 'The email must match the format example@example.com',
                  value: EMAIL_REG_EXP,
                },
                required: {
                  message: 'This field is required',
                  value: true,
                },
              }}
            />
            <p className={s.text}>
              Enter your email address and we will send you further instructions
            </p>
            {sendLinkStatus === 'success' && (
              <p className={s.textSuccess}>
                The link has been sent by email. If you don’t receive an email send link again
              </p>
            )}
          </form>
          <Button
            className={s.btnForm}
            disabled={isDisabled}
            fullWidth
            onClick={
              sendLinkStatus === 'success'
                ? () => handleResendEmail(email)
                : () => handleSubmitDataForm()
            }
            type={'submit'}
            variant={'primary'}
          >
            {sendLinkStatus === 'success' ? 'Send Link Again' : 'Send Link'}
          </Button>
          <Link className={s.signIn} href={'sign-in'}>
            Back to Sign In
          </Link>
          {sendLinkStatus !== 'success' && (
            <form className={s.reCaptcha} onSubmit={handleSubmitReCaptchaForm}>
              <Recaptcha label={'I’m not a robot'} variant={reCaptchaStatus} />
            </form>
          )}
        </div>
      )}
      <SentEmailModal email={email} isOpen={showModal} onCloseHandler={handleCloseShowModal} />
    </>
  )
}
