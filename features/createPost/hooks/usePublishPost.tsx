'use client'
import { setAlert } from '@/entities'
import { useMyProfileQuery } from '@/features/userProfile'
import { useAppDispatch, useAppSelector } from '@/shared'
import { useRouter } from 'next/navigation'

import { usePublishPostMutation } from '../api'
import { hideModal, prevStep, resetCurrentPost } from '../model'
import { convertUrlsToBlobs } from '../utils/ConvertUrlsToBlobs'

export const usePublishPost = () => {
  const dispatch = useAppDispatch()
  const [publishPost, { isLoading }] = usePublishPostMutation()
  const { description, images } = useAppSelector(state => state.createPost.currentPost)
  const { data: myProfile } = useMyProfileQuery()
  const route = useRouter()
  const goBackHandler = () => {
    dispatch(prevStep())
  }

  const publishPostHandler = async () => {
    const formData = await convertUrlsToBlobs(images, description || '')

    try {
      await publishPost(formData).unwrap()
      dispatch(resetCurrentPost())
      dispatch(hideModal())
      await Promise.all([
        fetch('/api/revalidate?tag=posts-' + myProfile?.id),
        fetch('/api/revalidate?tag=profile-' + myProfile?.id),
      ])
      route.refresh()
      dispatch(setAlert({ message: 'The post has been published:', type: 'accepted' }))
    } catch (error) {
      dispatch(
        setAlert({
          message: `Error publishing post:`,
          type: 'error',
        })
      )
    }
  }

  return {
    goBackHandler,
    isLoading,
    publishPostHandler,
  }
}
