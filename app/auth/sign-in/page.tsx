'use client'

import { SignIn } from '@/features/SignIn'

export default function SignInPage() {
  return (
    <>
      <SignIn onSumbit={() => alert('template')} />
    </>
  )
}
