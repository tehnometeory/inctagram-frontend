'use client'
import { ReactNode, useEffect } from 'react'

import { useAppSelector, useNRouter } from '@/shared'
import { HeaderApp } from '@/widgets'

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useNRouter()
  const isAuth = useAppSelector(state => state.auth.isAuthorized)

  useEffect(() => {
    if (!isAuth) {
      router.replace('/login')
    }
  }, [isAuth, router])

  if (isAuth) {
    return null
  }

  return (
    <>
      <HeaderApp isAuth={isAuth} />
      <main>{children}</main>
    </>
  )
}
