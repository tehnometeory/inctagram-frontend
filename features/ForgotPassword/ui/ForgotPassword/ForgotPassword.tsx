'use client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

import { FormForgotPassword } from '@/features/ForgotPassword'
import { useScreenDetector } from '@/shared'
import { Card } from '@rambo-react/ui-meteors'

import s from './ForgotPassword.module.scss'

export function ForgotPasswordRecaptchaWrapper() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY as string}>
      <ForgotPassword />
    </GoogleReCaptchaProvider>
  )
}

function ForgotPassword() {
  const { isMobile } = useScreenDetector()

  return (
    <section className={s.cardWrapper}>
      {isMobile ? (
        <div>
          <FormForgotPassword />
        </div>
      ) : (
        <Card>
          <FormForgotPassword />
        </Card>
      )}
    </section>
  )
}
