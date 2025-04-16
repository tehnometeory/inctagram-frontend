'use client'

import { useState } from 'react'

import { setAlert, useMeQuery } from '@/entities'
import { useUserProfileByIdQuery } from '@/features/userProfile'
import { ProfileConfirmationModal, useAppDispatch } from '@/shared'
import { Button, CloseOutline, ImageIconOutline, Modal } from '@rambo-react/ui-meteors'
import Image from 'next/image'

import s from './AvatarLoader.module.scss'

import { useDeleteAvatarMutation } from '../api'
import { AvatarSkeleton } from './AvatarSkeleton'
import { ImageCropper } from './imageCropper'

export const AvatarLoader = () => {
  const [isModal, setIsModal] = useState(false)
  const { data: me } = useMeQuery()
  const { avatarUrl, isLoading } = useUserProfileByIdQuery(me?.id as string, {
    selectFromResult: ({ data, isLoading }) => ({ avatarUrl: data?.avatarUrl, isLoading }),
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
      dispatch(setAlert({ message: 'Profile avatar deleted successfully', type: 'accepted' }))
      await fetch('/api/revalidate?tag=profile-' + me?.id, { method: 'POST' })
    } catch (error) {
      dispatch(setAlert({ message: 'Error delete avatar photo', type: 'error' }))
    }
  }

  const renderContent = () => {
    if (isLoading) {
      return <AvatarSkeleton />
    }

    if (avatarUrl) {
      return (
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
      )
    }

    return (
      <div className={s.photo}>
        <ImageIconOutline fill={'var(--color-light-100)'} height={48} width={48} />
      </div>
    )
  }

  return (
    <>
      <div>
        {renderContent()}
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
