'use client'

import { useAppSelector } from '@/shared'
import { Button, Header } from '@rambo-react/ui-meteors'
import { usePathname } from 'next/navigation'

import s from './AppHeader.module.scss'

import { useHeaderActions } from '../hooks/useHeaderActions'

export const AppHeader = () => {
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized)

  const pathname = usePathname()
  const { logInHandler, signUpHandler, ...actions } = useHeaderActions()

  const isAuthPage = pathname.startsWith('/auth/')

  return (
    <Header {...actions}>
      {!isAuthorized && !isAuthPage && (
        <div className={s.headerButtons}>
          <Button onClick={logInHandler} variant={'text'}>
            Log In
          </Button>
          <Button onClick={signUpHandler} variant={'primary'}>
            Sign Up
          </Button>
        </div>
      )}
    </Header>
  )
}
