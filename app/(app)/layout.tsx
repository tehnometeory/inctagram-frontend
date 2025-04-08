'use client'

import { FC, ReactNode } from 'react'

import { CreatePost, EditPostContainer } from '@/features'
import { ContentContainer, SidebarLayout, useAppSelector } from '@/shared'
import { HeaderApp, HeaderPublic, SidebarApp } from '@/widgets'

type Props = {
  children: ReactNode
}

const AppLayout = ({ children }: Props) => {
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
      <CreatePost />
      <EditPostContainer />
    </>
  )
}

export default AppLayout
