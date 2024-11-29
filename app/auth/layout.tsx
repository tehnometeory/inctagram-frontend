'use client'

import { ReactNode } from 'react'

import { useNRouter } from '@/shared'
import { Header } from '@rambo-react/ui-meteors'

import s from './layout.module.scss'

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useNRouter()

  const headerActions = {
    logInHandler: () => router.push('/auth/sign-in'),
    onSelectValueChange: () => {},
    signUpHandler: () => router.push('/auth/sign-up'),
    titleHandler: () => router.push('/'),
  }

  return (
    <div className={s.layout}>
      <Header {...headerActions} />
      <main className={s.container}>{children}</main>
    </div>
  )
}
