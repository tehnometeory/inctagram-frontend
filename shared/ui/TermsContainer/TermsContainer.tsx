import React from 'react'

import { ArrowBackOutline } from '@rambo-react/ui-meteors'
import Link from 'next/link'

import styles from '@/shared/ui/TermsContainer/terms.module.scss'

import text from './LoremText'

type TermsContainerProps = {
  title?: string
}

export default function TermsContainer({ title }: TermsContainerProps) {
  return (
    <>
      <div className={styles.comeBackButton}>
        <Link className={styles.comeBackLink} href={'/'}>
          <ArrowBackOutline height={'24'} viewBox={'0 0 24 24'} width={'24'} />
          <p>Back to Sign Up</p>
        </Link>
      </div>
      <div className={styles.textContainer}>
        <h1>{title}</h1>
        {text}
      </div>
    </>
  )
}
