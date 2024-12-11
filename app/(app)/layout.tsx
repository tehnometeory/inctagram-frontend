'use client'

import { ReactNode, useEffect } from 'react'

import { RoutesApp, useAppSelector, useNRouter } from '@/shared'
import { HeaderApp } from '@/widgets'

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useNRouter()
  const isAuth = useAppSelector(state => state.auth.isAuthorized)

  useEffect(() => {
    if (!isAuth) {
      router.replace(RoutesApp.signIn)
    }
  }, [isAuth, router])

  if (!isAuth) {
    return null
  }

  return (
    <>
      <HeaderApp isAuth={isAuth} />
      <main>{children}</main>
    </>
  )
}
