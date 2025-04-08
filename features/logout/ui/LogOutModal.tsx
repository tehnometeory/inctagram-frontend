import { useMeQuery } from '@/entities'
import { ProfileConfirmationModal } from '@/shared'

import s from './LogOutModal.module.scss'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export const LogOutModal = ({ isOpen, onClose, onConfirm }: Props) => {
  const { data } = useMeQuery()

  return (
    <ProfileConfirmationModal
      buttonMode={'double'}
      childClassName={s.childModal}
      isOpen={isOpen}
      onCloseHandler={onClose}
      onConfirmHandler={onConfirm}
      titleModal={'Log Out'}
    >
      <p className={s.textModal}>
        Are you really want to log out of your account “
        <span className={s.bold}>{data?.email}</span>”?
      </p>
    </ProfileConfirmationModal>
  )
}
