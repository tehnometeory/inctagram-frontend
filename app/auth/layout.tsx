'use client'

import { ReactNode, useEffect } from 'react'

import { RoutesApp, useAppSelector, useNRouter } from '@/shared'
import { HeaderApp } from '@/widgets'

import s from './layout.module.scss'

export default function AuthLayout({ children }: { children: ReactNode }) {
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
      <HeaderApp />
      <main className={s.container}>{children}</main>
    </>
  )
}
