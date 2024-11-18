import { Button, Modal } from '@rambo-react/ui-meteors'

import styles from './SentEmailModal.module.scss'

type Props = {
  email: string
  isOpen: boolean
  onCloseHandler: () => void
}

export const SentEmailModal = ({ email, isOpen, onCloseHandler }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onCloseHandler} title={'Email sent'}>
      <div className={styles.sentModalContainer}>
        <p>We have sent a link to confirm your email to {email}</p>
        <Button>OK</Button>
      </div>
    </Modal>
  )
}
