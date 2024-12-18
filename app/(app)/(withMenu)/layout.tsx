'use client'

import { ReactNode } from 'react'

import { ContentContainer, SidebarLayout } from '@/shared'
import { MenuApp, SidebarApp } from '@/widgets'

export default function WithMenuLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarLayout>
        <SidebarApp />
        <ContentContainer>{children}</ContentContainer>
      </SidebarLayout>
      <MenuApp />
    </>
  )
}
