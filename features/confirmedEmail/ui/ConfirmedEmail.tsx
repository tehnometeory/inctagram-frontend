'use client'

import { RoutesApp, useCheckTokenValidity, withAuthRedirect } from '@/shared'
import { Button } from '@rambo-react/ui-meteors'
import Image from 'next/image'
import Link from 'next/link'

import s from './ConfirmedEmail.module.scss'

export const ConfirmedEmail = withAuthRedirect(() => {
  const { isRedirecting } = useCheckTokenValidity(RoutesApp.expiredEmailLink, 'code')

  if (isRedirecting) {
    return null
  }

  return (
    <div className={s.container}>
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>Your email has been confirmed</p>
      <Link className={s.btnLink} href={RoutesApp.signIn}>
        <Button fullWidth={false} variant={'primary'}>
          Sign In
        </Button>
      </Link>

      <Image
        alt={'confirmed email'}
        className={s.img}
        height={300}
        layout={'responsive'}
        priority
        sizes={'(max-width: 425px) 395px, 432'}
        src={'/images/sign-up.svg'}
        width={432}
      />
    </div>
  )
})
