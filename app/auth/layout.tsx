'use client'
import { ReactNode } from 'react'

import { BaseLayout } from '@/shared'
import { AppHeader } from '@/widgets'

import s from './layout.module.scss'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <BaseLayout>
      <AppHeader />
      <main className={s.container}>{children}</main>
    </BaseLayout>
  )
}
