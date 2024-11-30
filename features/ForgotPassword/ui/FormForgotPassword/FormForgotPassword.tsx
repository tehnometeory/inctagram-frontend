'use client'
import { FormEvent, useRef, useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'

import {
  passwordRecoverySchema,
  useResendEmailMutation,
  useValidEmailMutation,
} from '@/features/ForgotPassword/api'
import { ControlledInput, SentEmailModal } from '@/shared/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Recaptcha } from '@rambo-react/ui-meteors'
import Link from 'next/link'

import s from './FormForgotPassword.module.scss'

export function FormForgotPassword() {
  const [showModal, setShowModal] = useState(false)
  const [recaptchaValue, setRecaptchaValue] = useState('')
  const [sendLinkStatus, setSendLinkStatus] = useState<'initial' | 'success'>('initial')
  const [reCaptchaStatus, setReCaptchaStatus] = useState<
    'checked' | 'expired' | 'initial' | 'loading' | 'withError'
  >('initial')

  const { control, handleSubmit, reset, setError, setValue, watch } = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(passwordRecoverySchema),
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
      setReCaptchaStatus('withError')
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
  const isDisabled =
    !email || reCaptchaStatus !== 'checked' || isLoadingResendEmail || isLoadingValidEmail

  return (
    <Card className={s.card}>
      <h1 className={s.title}>Forgot Password</h1>
      <div className={s.formContainer}>
        <form onSubmit={handleSubmitDataForm} ref={formRef}>
          <ControlledInput
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={'Epam@epam.com'}
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
      <SentEmailModal email={email} isOpen={showModal} onCloseHandler={handleCloseShowModal} />
    </Card>
  )
}