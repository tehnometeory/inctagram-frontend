'use client'

import { EmailConfirmationWrapper, ImgSettings } from '@/shared/ui/EmailConfirmationWrapper'
import { Button } from '@rambo-react/ui-meteors'
import { useRouter } from 'next/navigation'

export default function ConfirmedEmail() {
  const router = useRouter()

  const handleSignIn = () => {
    router.push('/auth/sign-in')
  }
  const imgSettings: ImgSettings = {
    desktop: { height: 300, width: 430 },
    mobile: { height: 220, width: 320 },
    src: '/images/sign-up.svg',
    tablet: { height: 250, width: 350 },
  }

  return (
    <EmailConfirmationWrapper
      description={'Your email has been confirmed'}
      imgSettings={imgSettings}
      title={'Congratulations!'}
    >
      <Button fullWidth={false} onClick={handleSignIn} variant={'primary'}>
        Sign In
      </Button>
    </EmailConfirmationWrapper>
  )
}
