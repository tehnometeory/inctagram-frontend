'use client'
import { FormEvent, useState } from 'react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'

import { useValidEmailMutation } from '@/features/ForgotPassword/model/passwordRecoveryApi'
import { ControlledInput, SentEmailModal } from '@/shared/ui'
import { Button, Card, Recaptcha } from '@rambo-react/ui-meteors'
import Link from 'next/link'

import s from './ForgotPassword.module.scss'

export function ForgotPasswordRecaptchaWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY as string}>
      <ForgotPassword />
    </GoogleReCaptchaProvider>
  )
}

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [recaptchaValue, setRecaptchaValue] = useState('')
  const [sendLinkStatus, setSendLinkStatus] = useState<'initial' | 'success'>('initial')
  const [reCaptchaStatus, setReCaptchaStatus] = useState<
    'checked' | 'expired' | 'initial' | 'loading' | 'withError'
  >('initial')

  const { control, handleSubmit, reset, setError } = useForm({ defaultValues: { email: '' } })
  const [validEmail] = useValidEmailMutation()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleCloseShowModal = () => {
    setShowModal(false)
    reset()
  }

  const handleSubmitDataForm = handleSubmit(async data => {
    try {
      await validEmail({ email: data.email, recaptchaValue }).unwrap()
      setEmail(data.email)
      setSendLinkStatus('success')
      setShowModal(true)
    } catch {
      setError('email', { message: "User with this email doesn't exist", type: 'manual' })
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

  const isDisabled = !recaptchaValue && sendLinkStatus !== 'success'

  return (
    <section className={s.cardWrapper}>
      <Card>
        <h1 className={s.title}>Forgot Password</h1>
        <form onSubmit={handleSubmitDataForm}>
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
          <Button
            disabled={isDisabled}
            fullWidth
            type={sendLinkStatus === 'success' ? 'button' : 'submit'}
            variant={'primary'}
          >
            {sendLinkStatus === 'success' ? 'Send Link Again' : 'Send Link'}
          </Button>
        </form>
        <Link className={s.signIn} href={'sign-in'}>
          Back to Sign In
        </Link>

        {sendLinkStatus !== 'success' && (
          <form className={s.reCaptcha} onSubmit={handleSubmitReCaptchaForm}>
            <Recaptcha label={'I’m not a robot'} variant={reCaptchaStatus} />
          </form>
        )}
        <SentEmailModal email={email} isOpen={showModal} onCloseHandler={handleCloseShowModal} />
      </Card>
    </section>
  )
}
