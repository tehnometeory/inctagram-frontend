'use client'

import { useEffect } from 'react'

import { setAlert } from '@/entities'
import { useAppDispatch } from '@/shared'

import { useGetPostByIdQuery } from '../api'
import { setSelectedPost, showPostModal } from '../model'

export const useGetPost = (postId: string) => {
  const dispatch = useAppDispatch()
  const skip = !postId
  const { data: post, error, isLoading, refetch } = useGetPostByIdQuery(postId, { skip })

  useEffect(() => {
    if (!post) {
      return
    }
    dispatch(setSelectedPost(post))
  }, [post?.id, dispatch, post])

  useEffect(() => {
    if (error) {
      dispatch(setAlert({ message: 'Post loading failed', type: 'error' }))
    }
  }, [error, dispatch])

  const refreshPostHandler = async () => {
    const result = await refetch()

    if (result.data) {
      dispatch(setSelectedPost(result.data))
      dispatch(showPostModal())
    }
  }

  return {
    error,
    isLoading,
    post,
    refreshPostHandler,
  }
}
