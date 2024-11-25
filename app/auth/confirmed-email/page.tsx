'use client'
import { useEffect } from 'react'

import { checkTokenValidity } from '@/shared/lib/CheckTokenValidity'
import { Button } from '@rambo-react/ui-meteors'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import styles from './ConfirmedEmail.module.scss'

import ConfirmedEmailImg from '../../../public/images/sign-up.svg'

export default function ConfirmedEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('code')

    if (!token) {
      router.replace('/auth/expired-email')

      return
    }
    if (!checkTokenValidity(token)) {
      router.replace('/auth/expired-email')

      return
    }
  }, [searchParams, router])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Congratulations!</h1>
      <p className={styles.description}>Your email has been confirmed</p>
      <Link className={styles.btnLink} href={'/auth/sign-in'}>
        <Button fullWidth={false} variant={'primary'}>
          Sign In
        </Button>
      </Link>

      <Image
        alt={'confirmed email'}
        className={styles.img}
        height={300}
        sizes={`(max-width: 425px) 320px,
                432px`}
        src={ConfirmedEmailImg}
        style={{
          width: '100%',
        }}
        width={432}
      />
    </div>
  )
}
