'use client'

import { useState } from 'react'

import { useMeQuery } from '@/entities'
import { useUserProfileByIdQuery } from '@/features/userProfile'
import { Button, ImageIconOutline, Modal } from '@rambo-react/ui-meteors'
import Image from 'next/image'

import s from './AvatarLoader.module.scss'

import { ImageCropper } from './imageCropper/ImageCropper'

export const AvatarLoader = () => {
  const [isModal, setIsModal] = useState(false)
  const { data: me } = useMeQuery()
  const { data } = useUserProfileByIdQuery(me?.id as string)

  const handlerOnClose = () => {
    setIsModal(false)
  }

  return (
    <>
      <div className={s.itemImage}>
        {data?.avatarUrl ? (
          <Image
            alt={'Profile Photo'}
            className={s.avatar}
            height={192}
            src={data.avatarUrl}
            width={192}
          />
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
        <ImageCropper onClose={handlerOnClose} id={me?.id}/>
      </Modal>
    </>
  )
}
