'use client'

import { ReactNode, useEffect } from 'react'

import { RoutesApp, useAppSelector, useNRouter } from '@/shared'

export default function PrivateLayout({ children }: { children: ReactNode }) {
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

  return children
}
