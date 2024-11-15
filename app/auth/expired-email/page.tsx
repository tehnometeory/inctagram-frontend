'use client'

import { ActionForm } from '@/shared/ui/ActionForm'
import { MessageBlock } from '@/shared/ui/MessageBlock'
import { ResponsiveImage } from '@/shared/ui/ResponsiveImage'
import { Header } from '@rambo-react/ui-meteors'
import { useRouter } from 'next/navigation'

import styles from '../confirmed-email/ConfirmedEmail.module.scss'

const languageOptions = [
  { iconId: 'flag-uk', label: 'English', value: 'en' },
  { iconId: 'flag-russia', label: 'Русский', value: 'ru' },
]

export default function ExpiredLink() {
  const router = useRouter()

  const handleResendLink = () => {
    // Логика для повторной отправки ссылки
  }

  return (
    <>
      <Header isAuthorized languageOptions={languageOptions} />
      <div className={styles.container}>
        <main className={styles.content}>
          <MessageBlock
            description={
              'Looks like the verification link has expired. Not to worry, we can send the link again.'
            }
            title={'Email verification link expired'}
          />
          <ActionForm
            buttonText={'Resend verification link'}
            inputPlaceholder={'Email'}
            onButtonClickAction={handleResendLink}
          />
          <div className={styles.imageContainer}>
            <ResponsiveImage
              alt={'Email verification expired illustration'}
              sizes={{
                desktop: { height: 300, width: 430 },
                mobile: { height: 200, width: 300 },
                tablet: { height: 250, width: 350 },
              }}
              src={'/images/time-management.svg'}
            />
          </div>
        </main>
      </div>
    </>
  )
}
