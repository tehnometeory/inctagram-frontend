'use client'
import { ReactNode, useEffect } from 'react'

import { useAppSelector, useNRouter } from '@/shared'
import { HeaderPublic } from '@/widgets'

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useNRouter()
  const isAuth = useAppSelector(state => state.auth.isAuthorized)

  useEffect(() => {
    if (isAuth) {
      router.replace('/home')
    }
  }, [isAuth, router])

  if (isAuth) {
    return null
  }

  return (
    <>
      <HeaderPublic />
      <main>{children}</main>
    </>
  )
}
