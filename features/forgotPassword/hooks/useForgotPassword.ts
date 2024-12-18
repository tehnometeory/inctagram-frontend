import { useState } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useForm } from 'react-hook-form'

import { formWithEmailSchema } from '@/entities'
import { ErrorMessage, useFormErrorsHandler } from '@/shared'
import { zodResolver } from '@hookform/resolvers/zod'

import { useResetPasswordMutation } from '../api'

type FormValues = {
  email: string
}

export const useForgotPassword = () => {
  const [showModal, setShowModal] = useState(false)
  const [recaptchaValue, setRecaptchaValue] = useState('')
  const [sendLinkStatus, setSendLinkStatus] = useState<'error' | 'initial' | 'success'>('initial')
  const [reCaptchaStatus, setReCaptchaStatus] = useState<
    'checked' | 'expired' | 'initial' | 'loading' | 'withError'
  >('initial')

  const { control, handleSubmit, reset, setError, setValue, watch } = useForm<FormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(formWithEmailSchema),
  })
  const [resetPassword, { error, isLoading: isLoadingValidEmail }] = useResetPasswordMutation()

  useFormErrorsHandler(error as ErrorMessage[], setError)
  const { executeRecaptcha } = useGoogleReCaptcha()

  const email = watch('email')
  const isDisabled = !email || reCaptchaStatus !== 'checked' || isLoadingValidEmail

  const handleCloseShowModal = () => {
    setShowModal(false)
    reset()
  }

  const handleSubmitDataForm = handleSubmit(async ({ email }) => {
    const response = await resetPassword({ email, recaptchaValue })

    if (response.error) {
      if ('data' in response.error) {
        const errorReCaptcha = (response.error.data as ErrorMessage).message

        if (errorReCaptcha === 'Invalid reCAPTCHA') {
          setSendLinkStatus('error')
          setReCaptchaStatus('expired')
        }
      }
    } else {
      setSendLinkStatus('success')
      setValue('email', email)
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

  return {
    control,
    email,
    handleCloseShowModal,
    handleReCaptcha,
    handleSubmitDataForm,
    isDisabled,
    reCaptchaStatus,
    sendLinkStatus,
    showModal,
  }
}
