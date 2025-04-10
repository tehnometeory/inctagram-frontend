'use client'

import { Button, Header } from '@rambo-react/ui-meteors'

import s from './HeaderPublic.module.scss'

import { useHeaderActions } from '../hooks/useHeaderActions'

export const HeaderPublic = () => {
  const { logInHandler, signUpHandler, ...actions } = useHeaderActions()

  return (
    <Header {...actions}>
      <div className={s.headerButtons}>
        <Button onClick={logInHandler} variant={'text'}>
          Log In
        </Button>
        <Button onClick={signUpHandler} variant={'primary'}>
          Sign Up
        </Button>
      </div>
    </Header>
  )
}
