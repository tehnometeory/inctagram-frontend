import { hideCancelPostModal, hideModal, resetCurrentPost } from '@/features'
import { useAppDispatch, useAppSelector } from '@/shared'
import { Button, Modal } from '@rambo-react/ui-meteors'

import s from './CancelPostModal.module.scss'

export const CancelPostModal = () => {
  const isModalCancelPostOpen = useAppSelector(state => state.createPost.isModalCancelPostOpen)

  const dispatch = useAppDispatch()
  const cancelPostHandler = () => {
    dispatch(resetCurrentPost())
    dispatch(hideCancelPostModal())
    dispatch(hideModal())
  }
  const onCloseHandler = () => {
    dispatch(hideCancelPostModal())
  }

  if (!isModalCancelPostOpen) {
    return null
  }

  return (
    <Modal
      className={s.modal}
      isOpen={isModalCancelPostOpen}
      onClose={onCloseHandler}
      title={'Сlose'}
    >
      <div className={s.container}>
        <div className={s.text}>
          <p>Do you really want to close the creation of a publication?</p>
          <p>If you close everything will be deleted.</p>
        </div>
        <div className={s.buttons}>
          <Button onClick={cancelPostHandler} variant={'outline'}>
            Discard
          </Button>
          <Button variant={'primary'}>Save draft</Button>
        </div>
      </div>
    </Modal>
  )
}
