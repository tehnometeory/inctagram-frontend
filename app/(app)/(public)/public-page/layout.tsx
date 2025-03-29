'use client'

import { ReactNode, useEffect } from 'react'

import { RoutesApp, useAppSelector, useNRouter } from '@/shared'

export default function PublicPageLayout({ children }: { children: ReactNode }) {
  const router = useNRouter()
  const isAuth = useAppSelector(state => !!state.auth.accessToken)

  useEffect(() => {
    if (isAuth) {
      router.replace(RoutesApp.home)
    }
  }, [isAuth, router])

  if (isAuth) {
    return null
  }

  return children
}
