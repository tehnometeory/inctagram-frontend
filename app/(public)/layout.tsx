'use client'

import { ReactNode, useEffect } from 'react'

import { RoutesApp, useAppSelector, useNRouter } from '@/shared'
import { HeaderPublic } from '@/widgets'

export default function PublicLayout({ children }: { children: ReactNode }) {
  const router = useNRouter()
  const isAuth = useAppSelector(state => state.auth.isAuthorized)

  useEffect(() => {
    if (isAuth) {
      router.replace(RoutesApp.home)
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
