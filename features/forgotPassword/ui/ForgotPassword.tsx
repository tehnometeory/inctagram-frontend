'use client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import { ForgotPasswordForm } from './ForgotPasswordForm'

export const ForgotPassword = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY as string}>
      <ForgotPasswordForm />
    </GoogleReCaptchaProvider>
  )
}
