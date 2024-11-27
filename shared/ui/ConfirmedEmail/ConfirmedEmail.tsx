'use client'
import { Button } from '@rambo-react/ui-meteors'
import Image from 'next/image'
import Link from 'next/link'

import styles from './ConfirmedEmail.module.scss'

import ConfirmedEmailImg from '../../../public/images/sign-up.svg'

export const ConfirmedEmail = () => {
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
