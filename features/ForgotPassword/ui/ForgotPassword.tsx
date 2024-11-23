'use client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import { FormForgotPassword } from '@/features/ForgotPassword/ui/FormForgotPassword'

import s from './ForgotPassword.module.scss'

export function ForgotPassword() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY as string}>
      <section className={s.cardWrapper}>
        <FormForgotPassword />
      </section>
    </GoogleReCaptchaProvider>
  )
}
