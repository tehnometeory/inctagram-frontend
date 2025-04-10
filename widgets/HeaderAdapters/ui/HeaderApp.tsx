'use client'

import { LogOutModal, useLogout } from '@/features'
import {
  BookmarkOutline,
  Header,
  LogOutOutline,
  SettingsOutline,
  TrendingUp,
} from '@rambo-react/ui-meteors'

import { useHeaderActions } from '../hooks/useHeaderActions'

type Props = {
  isAuth?: boolean
}

export const HeaderApp = ({ isAuth = false }: Props) => {
  const { logInHandler, signUpHandler, ...actions } = useHeaderActions()
  const { handleCloseModal, handleConfirmLogout, setShowModalLogout, showModalLogout } = useLogout()

  return (
    <>
      <Header
        {...actions}
        isAuthorized={isAuth}
        menuItems={[
          {
            icon: <SettingsOutline height={24} width={24} />,
            label: 'Profile settings',
            onClick: () => console.log('Profile clicked'),
            visible: true,
          },
          {
            disabled: true,
            icon: <TrendingUp height={24} width={24} />,
            label: 'Statistics',
            onClick: () => console.log('Statistics clicked'),
          },
          {
            icon: <BookmarkOutline height={24} width={24} />,
            label: 'Favorites',
            onClick: () => console.log('Statistics clicked'),
          },
          {
            icon: <LogOutOutline height={24} width={24} />,
            label: 'Log Out',
            onClick: () => setShowModalLogout(true),
          },
        ]}
      />
      <LogOutModal
        isOpen={showModalLogout}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </>
  )
}
