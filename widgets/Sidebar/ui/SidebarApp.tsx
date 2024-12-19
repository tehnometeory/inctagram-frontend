import { useState } from 'react'

import { useLogout } from '@/features'
import { ProfileConfirmationModal, useMenuHandlers } from '@/shared'
import { Sidebar } from '@rambo-react/ui-meteors'

import s from './SidebarApp.module.scss'

export const SidebarApp = () => {
  const sidebarCallbacks = useMenuHandlers()
  const { isLoading, logoutItem } = useLogout()
  const [showModal, setShowModal] = useState(false)
  const handleCloseModal = (): void => {
    setShowModal(false)
  }

  const handleConfirmLogout = () => {
    logoutItem.itemCallback()
    handleCloseModal()
  }

  const handleShowModal = (): void => {
    setShowModal(true)
  }

  return (
    <div className={s.container}>
      <Sidebar
        callbacks={[...sidebarCallbacks, { itemCallback: handleShowModal, name: 'Log Out' }]}
      />
      {showModal && (
        <ProfileConfirmationModal
          buttonMode={'double'}
          childClassName={s.childModal}
          isOpen={showModal}
          onCloseHandler={handleCloseModal}
          onConfirmHandler={handleConfirmLogout}
          titleModal={'Log Out'}
        >
          <p className={s.textModal}>
            Are you really want to log out of your account “Epam@epam.com”?
          </p>
        </ProfileConfirmationModal>
      )}
    </div>
  )
}
