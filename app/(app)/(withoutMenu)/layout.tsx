'use client'

import { ReactNode } from 'react'

import { ContentContainer, SidebarLayout } from '@/shared'
import { SidebarApp } from '@/widgets'

export default function WithoutMenuLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarLayout>
        <SidebarApp />
        <ContentContainer>{children}</ContentContainer>
      </SidebarLayout>
    </>
  )
}
