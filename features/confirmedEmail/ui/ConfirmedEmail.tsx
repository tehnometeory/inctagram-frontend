'use client'

import { RoutesApp, useCheckTokenValidity, withAuthRedirect } from '@/shared'
import { Button } from '@rambo-react/ui-meteors'
import Image from 'next/image'
import Link from 'next/link'

import styles from './ConfirmedEmail.module.scss'

export const ConfirmedEmail = withAuthRedirect(() => {
  const { isRedirecting } = useCheckTokenValidity(RoutesApp.expiredEmailLink, 'code')

  if (isRedirecting) {
    return null
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Congratulations!</h1>
      <p className={styles.description}>Your email has been confirmed</p>
      <Link className={styles.btnLink} href={RoutesApp.signIn}>
        <Button fullWidth={false} variant={'primary'}>
          Sign In
        </Button>
      </Link>

      <Image
        alt={'confirmed email'}
        className={styles.img}
        height={300}
        priority
        sizes={`(max-width: 425px) 320px,
                432px`}
        src={'/images/sign-up.svg'}
        width={432}
      />
    </div>
  )
})
