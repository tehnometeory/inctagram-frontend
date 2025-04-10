'use client'
import { CancelPostModal } from '@/features'
import { CroppingHeader } from '@/features/createPost/ui/customHeaders/CroppingHeader/CroppingHeader'
import { FilterHeader } from '@/features/createPost/ui/customHeaders/FilterHeader/FilterHeader'
import { PublishHeader } from '@/features/createPost/ui/customHeaders/PublishHeader/PublishHeader'
import { useAppDispatch, useAppSelector } from '@/shared'
import { Modal } from '@rambo-react/ui-meteors'

import s from './CreatePost.module.scss'

import { hideModal, resetCurrentPost, showCancelPostModal } from '../model'
import { AddImage, CropImage, FiltersContainer } from './steps'
import { PublicationContainer } from './steps/Publication/PublicationContainer'

export const CreatePost = () => {
  const {
    currentPost: { currentStep },
    isModalOpen,
  } = useAppSelector(state => state.createPost)
  const dispatch = useAppDispatch()

  const closeHandler = () => {
    dispatch(resetCurrentPost())
    dispatch(hideModal())
  }
  const openCancelPostCreationModal = () => {
    dispatch(showCancelPostModal())
  }

  if (!isModalOpen) {
    return null
  }

  return (
    <>
      <CancelPostModal />
      <Modal
        className={s.modal}
        isOpen={isModalOpen}
        onClose={currentStep === 1 ? closeHandler : undefined}
        onCloseOut={currentStep > 1 ? openCancelPostCreationModal : undefined}
        {...(currentStep === 1 && { title: 'Add Photo' })}
        customHeader={
          {
            2: <CroppingHeader />,
            3: <FilterHeader />,
            4: <PublishHeader />,
          }[currentStep] || undefined
        }
      >
        {currentStep === 1 && <AddImage />}
        {currentStep === 2 && <CropImage />}
        {currentStep === 3 && <FiltersContainer />}
        {currentStep === 4 && <PublicationContainer />}
      </Modal>
    </>
  )
}
