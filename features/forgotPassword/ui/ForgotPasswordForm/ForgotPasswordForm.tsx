'use client'
import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'

import { formWithEmailSchema } from '@/entities'
import {
  ControlledInput,
  ErrorsMessage,
  ErrorsMessagesResponse,
  SentEmailModal,
  handleNetworkError,
  handleServerError,
  useAppDispatch,
} from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Card, Recaptcha } from '@rambo-react/ui-meteors'
import Link from 'next/link'

import s from './ForgotPasswordForm.module.scss'

import { useResetPasswordMutation } from '../../api'

export function ForgotPasswordForm() {
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState(false)
  const [recaptchaValue, setRecaptchaValue] = useState('')
  const [sendLinkStatus, setSendLinkStatus] = useState<'error' | 'initial' | 'success'>('initial')
  const [reCaptchaStatus, setReCaptchaStatus] = useState<
    'checked' | 'expired' | 'initial' | 'loading' | 'withError'
  >('initial')

  const { control, handleSubmit, reset, setError, setValue, watch } = useForm({
    defaultValues: { email: '' },
    resolver: zodResolver(formWithEmailSchema),
  })
  const [validEmail, { isLoading: isLoadingValidEmail }] = useResetPasswordMutation()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleCloseShowModal = () => {
    setShowModal(false)
    reset()
  }

  const handleSubmitDataForm = handleSubmit(async data => {
    const response = await validEmail({ email: data.email, recaptchaValue })

    if (response.error) {
      if ('status' in response.error && response.error.status === 500) {
        handleServerError(dispatch)
      }
      if ('status' in response.error && response.error.status === 'FETCH_ERROR') {
        handleNetworkError(dispatch)
      }
      if ('data' in response.error) {
        const errorReCaptcha = (response.error.data as ErrorsMessage).message

        if (errorReCaptcha === 'Invalid reCAPTCHA') {
          setSendLinkStatus('error')
          setReCaptchaStatus('expired')
        }
      }
      if ('data' in response.error) {
        const errorMessage = (response.error.data as ErrorsMessagesResponse).errorsMessages[0]
          .message

        if (errorMessage === 'user not found') {
          setError('email', { message: "User with this email doesn't exist", type: 'manual' })
          setReCaptchaStatus('withError')
        }
      }
    } else {
      setSendLinkStatus('success')
      setValue('email', data.email)
      setShowModal(true)
    }
  })
  const handleReCaptcha = async () => {
    if (!executeRecaptcha) {
      setError('email', { message: 'Execute recaptcha not yet available', type: 'manual' })

      return
    }

    setReCaptchaStatus('loading')
    const token = await executeRecaptcha('password_recovery')

    setRecaptchaValue(token)
    setReCaptchaStatus('checked')
  }

  const email = watch('email')
  const isDisabled = !email || reCaptchaStatus !== 'checked' || isLoadingValidEmail

  return (
    <Card className={s.card}>
      <form className={s.formContainer} onSubmit={handleSubmitDataForm}>
        <h1 className={s.title}>Forgot Password</h1>
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
        <Link className={s.signIn} href={'sign-in'}>
          Back to Sign In
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
    </Card>
  )
}
