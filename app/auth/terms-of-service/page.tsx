'use client'
import React from 'react'

import text from '@/app/auth/terms-of-service/ui/text.json'
import { Icon } from '@rambo-react/ui-meteors'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import styles from './ui/terms.module.scss'

//<Link href={'/auth/terms-of-service?type=rules'}>Terms of Service</Link>
//<Link href={'/auth/terms-of-service?type=privacy'}>Privacy Policy</Link>

type TermsType = 'privacy' | 'rules'

export default function TermsPage() {
  const searchParams = useSearchParams()
  const type = searchParams?.get('type') as TermsType | null

  if (!type) {
    return <p>Error: document type not specified</p>
  }
  let title: string

  switch (type) {
    case 'rules':
      title = 'Terms of Service'
      break
    case 'privacy':
      title = 'Privacy Policy'
      break
    default:
      title = 'Error'
      break
  }

  return (
    <>
      <div className={styles.comeBackButton}>
        <Link className={styles.comeBackLink} href={'/'}>
          <Icon height={'24'} id={'arrow-back-outline'} viewBox={'0 0 24 24'} width={'24'} />
          <p>Back to Sign Up</p>
        </Link>
      </div>
      <div className={styles.textContainer}>
        <h1>{title}</h1>
        {text.text.split('\n').map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>
    </>
  )
}
