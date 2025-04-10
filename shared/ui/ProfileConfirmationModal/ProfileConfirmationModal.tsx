import { PropsWithChildren } from 'react'

import { Button, Modal } from '@rambo-react/ui-meteors'

import s from './ProfileConfirmationModal.module.scss'

type ProfileConfirmationModalBaseProps = {
  childClassName: string
  isOpen: boolean
  onCloseHandler: () => void
  onConfirmHandler: () => void
  titleModal: string
}

type Props = (
  | {
      buttonMode: 'single'
      titleSingleBtn: string
    }
  | { buttonMode: 'double'; titleSingleBtn?: never }
) &
  ProfileConfirmationModalBaseProps

export const ProfileConfirmationModal = ({
  buttonMode,
  childClassName,
  children,
  isOpen,
  onCloseHandler,
  onConfirmHandler,
  titleModal,
  titleSingleBtn,
}: PropsWithChildren<Props>) => {
  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} title={titleModal}>
      <div className={s.contentWrapper}>
        <div className={childClassName}>{children}</div>
        <div className={s.btnWrapper}>
          {buttonMode === 'single' ? (
            <Button fullWidth onClick={onConfirmHandler} variant={'primary'}>
              {titleSingleBtn}
            </Button>
          ) : (
            <>
              <Button className={s.btnDouble} onClick={onConfirmHandler} variant={'outline'}>
                Yes
              </Button>
              <Button className={s.btnDouble} onClick={onCloseHandler} variant={'primary'}>
                No
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}
