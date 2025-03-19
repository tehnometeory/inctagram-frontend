'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { setAlert } from '@/entities'
import { clearSelectedPost, hidePostModal, useDeletePostByIdMutation } from '@/features'
import {
  Carousel,
  PostType,
  ProfileConfirmationModal,
  UserNameAndAvatar,
  useAppDispatch,
  useAppSelector,
} from '@/shared'
import {
  Bookmark,
  BookmarkOutline,
  Button,
  EditOutline,
  Heart,
  HeartOutline,
  Modal,
  MoreHorizontalOutline,
  PaperPlaneOutline,
  TextArea,
  TrashOutline,
} from '@rambo-react/ui-meteors'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

import s from './SelectedPost.module.scss'

import { setSelectedPost, showEditModal, showPostModal } from '..'
import { convertToRelativeTime } from '../utils/convertToRelativeTime'
import { getDateParts } from '../utils/getDateParts'

type Props = {
  post: PostType
}

export const SelectedPost = ({ post: initialPost }: Props) => {
  const [deletePost] = useDeletePostByIdMutation()

  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [openedMenu, setOpenedMenu] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized)
  const postFromStore = useAppSelector(state => state.selectedPost.post)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (initialPost) {
      dispatch(setSelectedPost(initialPost))
      dispatch(showPostModal())
    }
  }, [initialPost, dispatch])

  const isModalOpen = useAppSelector(state => state.selectedPost.isModalOpen)

  const images = postFromStore?.photos?.map(photo => photo.url) ?? []

  const menuRef = useRef<HTMLDivElement | null>(null)

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest(`.${s.menuBtn}`)
    ) {
      setOpenedMenu(false)
    }
  }, [])

  useEffect(() => {
    if (openedMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [openedMenu, handleClickOutside])

  const handleClickEditPost = () => {
    dispatch(showEditModal())
    dispatch(hidePostModal())
    setOpenedMenu(false)
  }

  if (!postFromStore || !isModalOpen) {
    return null
  }

  const timeAgo = convertToRelativeTime(postFromStore.createdAt)
  const { day, month, year } = getDateParts(postFromStore.createdAt)

  const handleShowDeletePostModal = () => {
    setOpenDeleteModal(true)
  }

  const handleDeletePost = async () => {
    if (!postFromStore) {
      return
    }

    try {
      await deletePost(postFromStore.id).unwrap()
      dispatch(clearSelectedPost())
      setOpenDeleteModal(false)
      dispatch(hidePostModal())
      await Promise.all([
        fetch(`/api/revalidate?tag=posts-${postFromStore.userId}`, { method: 'POST' }),
        fetch(`/api/revalidate?tag=profile-${postFromStore.userId}`, { method: 'POST' }),
        fetch(`/api/revalidate?tag=post-${postFromStore.id}`, { method: 'POST' }),
      ])

      router.replace(`/profile/${postFromStore.userId}`)
      dispatch(setAlert({ message: 'Post deleted', type: 'accepted' }))
    } catch (error) {
      dispatch(setAlert({ message: 'Error deleting post', type: 'error' }))
    }
  }

  return (
    <Modal
      className={s.Modal}
      isOpen={isModalOpen}
      onCloseOut={() => {
        if (!openDeleteModal) {
          dispatch(hidePostModal())
          router.back()
        }
      }}
      withoutHeader
    >
      <div className={s.container}>
        <Carousel images={images} />
        <div className={s.contentWrapper}>
          <div className={s.header}>
            <UserNameAndAvatar userName={postFromStore.user.username} />
            {isAuthorized && (
              <div className={s.menu}>
                <Button
                  autoFocus={false}
                  className={clsx(s.menuBtn, openedMenu && s.openedMenu)}
                  onClick={() => setOpenedMenu(prev => !prev)}
                  variant={'text'}
                >
                  <MoreHorizontalOutline height={24} width={24} />
                </Button>
                {openedMenu && (
                  <div className={s.editAndDeletePostBlock} ref={menuRef}>
                    <Button
                      className={s.editAndDeletePostBtn}
                      onClick={handleClickEditPost}
                      variant={'text'}
                    >
                      <EditOutline height={24} width={24} />
                      <span>Edit Post</span>
                    </Button>
                    <Button
                      className={s.editAndDeletePostBtn}
                      onClick={handleShowDeletePostModal}
                      variant={'text'}
                    >
                      <TrashOutline height={24} width={24} />
                      <span>Delete Post</span>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className={s.descriptionAndCommentsBlock}>
            <div className={s.descriptionBlock}>
              <div className={s.descriptionText}>
                <span className={s.descriptionUserName}>{postFromStore.user.username}</span>{' '}
                <span>{postFromStore.description}</span>
              </div>
              <p className={s.time}>{timeAgo}</p>
            </div>
            <div className={s.commentsBlock}></div>
          </div>
          <div className={s.likesAndCommentsWrapper}>
            <div className={s.likesAndRepostsBlock}>
              {isAuthorized && (
                <div className={s.icons}>
                  <div className={s.leftIcons}>
                    <div className={s.like} onClick={() => setLiked(prev => !prev)}>
                      {liked ? (
                        <Heart fill={'var( --color-danger-500)'} height={24} width={24} />
                      ) : (
                        <HeartOutline fill={'white'} height={24} width={24} />
                      )}
                    </div>

                    <PaperPlaneOutline fill={'white'} height={24} width={24} />
                  </div>
                  <div className={s.save} onClick={() => setSaved(prev => !prev)}>
                    {saved ? (
                      <Bookmark fill={'var( --color-accent-700)'} height={24} width={24} />
                    ) : (
                      <BookmarkOutline fill={'white'} height={24} width={24} />
                    )}
                  </div>
                </div>
              )}

              <div className={s.likes}>
                <p className={s.likeCount}>
                  2243 &quot;<span>Like</span>&quot;
                </p>
                <p className={s.postDate}>
                  {month} {day}, {year}
                </p>
              </div>
            </div>
            {isAuthorized && (
              <div className={s.addCommentBlock}>
                <TextArea
                  className={s.addCommentArea}
                  label={''}
                  maxLength={500}
                  placeholder={'Add a Comment...'}
                />
                <Button className={s.publishBtn} variant={'text'}>
                  Publish
                </Button>
              </div>
            )}
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
        onConfirmHandler={handleDeletePost}
        titleModal={'Delete post'}
      >
        <p className={s.modalText}>Are you sure you want to delete this post?</p>
      </ProfileConfirmationModal>
    </Modal>
  )
}
