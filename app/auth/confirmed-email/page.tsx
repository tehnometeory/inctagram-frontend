'use client'
import { useEffect } from 'react'

import { Button } from '@rambo-react/ui-meteors'
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import styles from './ConfirmedEmail.module.scss'

import ConfirmedEmailImg from '../../../public/images/sign-up.svg'

type JWTPayload = {
  exp: number
}

export default function ConfirmedEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  //
  // useEffect(() => {
  //   const token = searchParams.get('code')
  //
  //   if (!token) {
  //     router.replace('/auth/expired-email')
  //
  //     return
  //   }
  //   try {
  //     const { exp }: JWTPayload = jwtDecode(token)
  //     const now = Math.floor(Date.now() / 1000)
  //
  //     if (now > exp) {
  //       router.replace('/auth/expired-email')
  //
  //       return
  //     }
  //   } catch (error) {
  //     console.error('token processing error: ', error)
  //     router.replace('/auth/expired-email')
  //   }
  // }, [searchParams, router])

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Congratulations!</h1>
      <p className={styles.description}>Your email has been confirmed</p>
      <Link href={'/auth/sign-in'}>
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
