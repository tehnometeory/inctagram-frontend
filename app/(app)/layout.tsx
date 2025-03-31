'use client'

import { FC, ReactNode } from 'react'

import { CreatePost, EditPostContainer } from '@/features'
import { ContentContainer, SidebarLayout, useAppSelector } from '@/shared'
import { HeaderApp, HeaderPublic, SidebarApp } from '@/widgets'

interface AppLayoutProps {
  children: ReactNode
  modal: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({ children, modal }) => {
  const isAuth = useAppSelector(state => !!state.auth.accessToken)

  return (
    <>
      {isAuth ? <HeaderApp isAuth={isAuth} /> : <HeaderPublic />}
      {isAuth ? (
        <SidebarLayout>
          <SidebarApp />
          <ContentContainer>{children}</ContentContainer>
        </SidebarLayout>
      ) : (
        <ContentContainer>{children}</ContentContainer>
      )}
      {modal}
      <CreatePost />
      <EditPostContainer />
    </>
  )
}

export default AppLayout
