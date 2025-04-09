'use client'

import { useState } from 'react'

import { setAlert, useMeQuery } from '@/entities'
import { useUserProfileByIdQuery } from '@/features/userProfile'
import { ProfileConfirmationModal, useAppDispatch } from '@/shared'
import { Button, CloseOutline, ImageIconOutline, Modal } from '@rambo-react/ui-meteors'
import Image from 'next/image'

import s from './AvatarLoader.module.scss'

import { useDeleteAvatarMutation } from '../api'
import { ImageCropper } from './imageCropper/ImageCropper'

export const AvatarLoader = () => {
  const [isModal, setIsModal] = useState(false)
  const { data: me } = useMeQuery()
  const { avatarUrl } = useUserProfileByIdQuery(me?.id as string, {
    selectFromResult: ({ data }) => ({ avatarUrl: data?.avatarUrl }),
  })
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [deleteAvatarPhoto] = useDeleteAvatarMutation()

  const handlerOnClose = () => {
    setIsModal(false)
  }

  const handleShowDeletePostModal = () => {
    setOpenDeleteModal(true)
  }

  const handleDeleteAvatarPhoto = async () => {
    try {
      await deleteAvatarPhoto()
      setOpenDeleteModal(false)
      dispatch(setAlert({ message: 'Profile Avatar delete successfully', type: 'accepted' }))
      await fetch('/api/revalidate?tag=profile-' + me?.id, { method: 'POST' })
    } catch (error) {
      dispatch(setAlert({ message: 'Error delete Avatar Photo', type: 'error' }))
    }
  }

  return (
    <>
      <div>
        {avatarUrl ? (
          <>
            <div className={s.itemImage}>
              <Image
                alt={'Profile Photo'}
                className={s.avatar}
                height={192}
                src={avatarUrl}
                width={192}
              />
              <div className={s.overlay}>
                <div
                  aria-label={'delete avatar'}
                  className={s.circle}
                  onClick={handleShowDeletePostModal}
                  role={'button'}
                  tabIndex={0}
                >
                  <CloseOutline
                    className={s.cross}
                    fill={'var(--color-light-100)'}
                    height={16}
                    width={16}
                  />
                </div>
              </div>
            </div>
            <ProfileConfirmationModal
              buttonMode={'double'}
              childClassName={s.deleteModalChild}
              isOpen={openDeleteModal}
              onCloseHandler={() => {
                setOpenDeleteModal(false)
              }}
              onConfirmHandler={handleDeleteAvatarPhoto}
              titleModal={'Delete Photo'}
            >
              <p className={s.modalText}>Are you sure you want to delete the photo?</p>
            </ProfileConfirmationModal>
          </>
        ) : (
          <div className={s.photo}>
            <ImageIconOutline fill={'var(--color-light-100)'} height={48} width={48} />
          </div>
        )}

        <Button type={'button'} variant={'outline'} onClick={() => setIsModal(true)}>
          Add a Profile Photo
        </Button>
      </div>
      <Modal
        className={s.modal}
        isOpen={isModal}
        onClose={handlerOnClose}
        onCloseOut={handlerOnClose}
        title={'Add a Profile Photo'}
      >
        <ImageCropper onClose={handlerOnClose} id={me?.id as string} />
      </Modal>
    </>
  )
}
