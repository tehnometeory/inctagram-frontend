'use client'

import { useHeaderActions } from '@/shared/hooks/useHeaderActions'
import { Button, Header } from '@rambo-react/ui-meteors'
import { usePathname } from 'next/navigation'

import s from './AppHeader.module.scss'

export const AppHeader = () => {
  //заглушка
  const isAuthorized = false

  const pathname = usePathname()
  const { logInHandler, signUpHandler, ...actions } = useHeaderActions()

  const isAuthPage = pathname.startsWith('/home')

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
