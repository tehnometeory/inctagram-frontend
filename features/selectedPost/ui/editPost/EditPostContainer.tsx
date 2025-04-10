'use client'
import { hideEditModal, showPostModal } from '@/features'
import { useAppDispatch, useAppSelector } from '@/shared'
import { Modal } from '@rambo-react/ui-meteors'

import s from './EditPost.module.scss'

import { EditPost } from './EditPost'

export const EditPostContainer = () => {
  const isEdit = useAppSelector(state => state.selectedPost.isEditing)
  const dispatch = useAppDispatch()

  const closeHandler = () => {
    dispatch(hideEditModal())
    dispatch(showPostModal())
  }

  if (!isEdit) {
    return null
  }

  return (
    <>
      <Modal className={s.modal} isOpen={isEdit} onClose={closeHandler} title={'Edit Post'}>
        <EditPost />
      </Modal>
    </>
  )
}
