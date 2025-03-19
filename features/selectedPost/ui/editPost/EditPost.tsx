'use client'

import { useState } from 'react'

import { setAlert } from '@/entities'
import {
  hideEditModal,
  setSelectedPost,
  showPostModal,
  useSendNewDescriptionMutation,
} from '@/features/selectedPost'
import { DescriptionPost, useAppDispatch, useAppSelector } from '@/shared'
import { Button } from '@rambo-react/ui-meteors'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import s from './EditPost.module.scss'

export const EditPost = () => {
  const post = useAppSelector(state => state.selectedPost.post)
  const id = post?.id
  const images = post?.photos?.map(photo => photo.url) ?? []
  const userName = post?.user.username
  const [newDescription, setNewDescription] = useState(post?.description || '')
  const [sendNewDescription, { isLoading }] = useSendNewDescriptionMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleSendNewDescription = async () => {
    if (id && newDescription) {
      try {
        await sendNewDescription({ description: newDescription, id }).unwrap()
        dispatch(setSelectedPost({ ...post, description: newDescription }))
        dispatch(showPostModal())
        dispatch(hideEditModal())
        await fetch('/api/revalidate?tag=posts-' + post.userId, { method: 'POST' })
        await fetch('/api/revalidate?tag=post-' + post.id, { method: 'POST' })
        router.refresh()
      } catch (error) {
        dispatch(setAlert({ message: 'Error sending new description:', type: 'error' }))
      }
    }
  }

  return (
    <div className={s.container}>
      <div className={s.imageWrapper}>
        <Image
          alt={`Image 1`}
          className={s.image}
          fill
          sizes={'(max-width: 600px) 100vw, 490px'}
          src={images[0]}
        />
      </div>
      <DescriptionPost
        description={newDescription}
        sendNewPostDescription={setNewDescription}
        userName={userName}
      >
        <div className={s.buttonEdit}>
          <Button disabled={isLoading} onClick={handleSendNewDescription}>
            Save Changes
          </Button>
        </div>
      </DescriptionPost>
    </div>
  )
}
