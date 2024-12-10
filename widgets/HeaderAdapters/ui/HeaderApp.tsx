'use client'

import { Header } from '@rambo-react/ui-meteors'

import { useHeaderActions } from '../hooks/useHeaderActions'

type Props = {
  isAuth?: boolean
}

export const HeaderApp = ({ isAuth = false }: Props) => {
  const { logInHandler, signUpHandler, ...actions } = useHeaderActions()

  return <Header {...actions} isAuthorized={isAuth} />
}
