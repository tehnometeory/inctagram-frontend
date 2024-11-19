'use client'
import { useState } from 'react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'

import { ControlledInput } from '@/shared/ui'
import { Button, Card, Modal, Recaptcha } from '@rambo-react/ui-meteors'
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
  const { control, handleSubmit, reset, setError } = useForm()
  const [showModal, setShowModal] = useState(false)
  const [reCaptchaToken, setReCaptchaToken] = useState('')
  const [reCaptcha, setReCaptcha] = useState<
    'checked' | 'expired' | 'initial' | 'loading' | 'withError'
  >('initial')

  const [sendLinkStatus, setSendLinkStatus] = useState<'initial' | 'success'>('initial')

  const [email, setEmail] = useState(null)
  const { executeRecaptcha } = useGoogleReCaptcha()
  const handleCloseShowModal = () => {
    setShowModal(false)
    reset()
  }

  const handleSubmitReCaptchaForm = async (event: any) => {
    event.preventDefault()
    setReCaptcha('loading')
    if (!executeRecaptcha) {
      setError('email', { message: 'Execute recaptcha not yet available', type: 'manual' })

      return
    }

    const token = await executeRecaptcha('password_recovery')

    setReCaptchaToken(token)
    setReCaptcha('checked')
  }

  const isDisabled = () => {
    if (sendLinkStatus === 'success') {
      return false
    }

    return !reCaptchaToken
  }

  return (
    <section className={s.cardWrapper}>
      <Card>
        <h1 className={s.title}>Forgot Password</h1>
        <form>
          <ControlledInput
            control={control}
            label={'Email'}
            name={'email'}
            placeholder={email ?? 'Epam@epam.com'}
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
            disabled={isDisabled()}
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
            <Recaptcha label={'I’m not a robot'} variant={reCaptcha} />
          </form>
        )}
        <Modal isOpen={showModal} onClose={handleCloseShowModal} title={'Email sent'}>
          <p className={s.textModal}>We have sent a link to confirm your email to {email}</p>
          <div className={s.btnWrapper}>
            <Button className={s.btnModal} onClick={handleCloseShowModal}>
              OK
            </Button>
          </div>
        </Modal>
      </Card>
    </section>
  )
}
