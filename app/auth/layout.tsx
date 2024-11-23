'use client'

import { ReactNode } from 'react'

import { Header } from '@rambo-react/ui-meteors'

import s from './layout.module.scss'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className={s.layout}>
      <Header />
      <main className={s.container}>{children}</main>
    </div>
  )
}
