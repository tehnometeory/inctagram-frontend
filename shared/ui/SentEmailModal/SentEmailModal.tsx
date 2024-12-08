import { Button, Modal } from '@rambo-react/ui-meteors'

import s from './SentEmailModal.module.scss'

type Props = {
  email: string
  isOpen: boolean
  onCloseHandler: () => void
}

export const SentEmailModal = ({ email, isOpen, onCloseHandler }: Props) => {
  return (
    <Modal className={s.modal} isOpen={isOpen} onClose={onCloseHandler} title={'Email sent'}>
      <div className={s.content}>
        <p>We have sent a link to confirm your email to {email}</p>
        <Button className={s.button} onClick={onCloseHandler}>
          OK
        </Button>
      </div>
    </Modal>
  )
}
