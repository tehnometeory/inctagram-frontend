'use client'
import { MessageBlock } from '@/shared/ui/MessageBlock'
import { ResponsiveImage } from '@/shared/ui/ResponsiveImage/ResponsiveImage'
import { Button, Header } from '@rambo-react/ui-meteors'
import { useRouter } from 'next/navigation'

import styles from './ConfirmedEmail.module.scss'

const languageOptions = [
  { iconId: 'flag-uk', label: 'English', value: 'en' },
  { iconId: 'flag-russia', label: 'Русский', value: 'ru' },
]

export default function ConfirmedEmail() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/auth/sign-in')
  }

  return (
    <>
      <Header isAuthorized languageOptions={languageOptions} />
      <div className={styles.container}>
        <main className={styles.content}>
          <MessageBlock description={'Your email has been confirmed'} title={'Congratulations!'} />
          <Button fullWidth={false} onClick={handleSignIn} variant={'primary'}>
            Sign In
          </Button>
          <div className={styles.imageContainer}>
            <ResponsiveImage
              alt={'Email confirmed illustration'}
              sizes={{
                desktop: { height: 300, width: 430 },
                mobile: { height: 200, width: 300 },
                tablet: { height: 250, width: 350 },
              }}
              src={'/images/sign-up.svg'}
            />
          </div>
        </main>
      </div>
    </>
  )
}
