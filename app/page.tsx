'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Link href={'/auth/terms-of-service'}>Terms of Service</Link>
      <br />
      <Link href={'/auth/privacy-policy'}>Privacy Policy</Link>
    </div>
  )
}
