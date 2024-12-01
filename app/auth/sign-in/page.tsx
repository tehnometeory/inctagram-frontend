'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { SignIn } from '@/features/SignIn'
import { RootState } from '@/shared'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const token = useSelector<RootState>(state => state.auth.accessToken)
  const router = useRouter()

  useEffect(() => {
    if (token) {
      router.push('/home')
    }
  }, [token, router])

  return (
    <>
      <SignIn />
    </>
  )
}
