'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { setAlert } from '@/entities'
import { clearSelectedPost, hidePostModal, useDeletePostByIdMutation } from '@/features'
import {
  Carousel,
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

import s from './SelectedPost.module.scss'

import { showEditModal } from '..'
import { convertToRelativeTime } from '../utils/convertToRelativeTime'
import { getDateParts } from '../utils/getDateParts'

export const SelectedPost = () => {
  const [deletePost] = useDeletePostByIdMutation()

  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [openedMenu, setOpenedMenu] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const isAuthorized = useAppSelector(state => state.auth.isAuthorized)
  const dispatch = useAppDispatch()

  const post = useAppSelector(state => state.selectedPost.post)

  const isModalOpen = useAppSelector(state => state.selectedPost.isModalOpen)

  const images = post?.photos?.map(photo => photo.url) ?? []

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

  if (!post || !isModalOpen) {
    return null
  }

  const timeAgo = convertToRelativeTime(post.createdAt)
  const { day, month, year } = getDateParts(post.createdAt)

  const handleShowDeletePostModal = () => {
    setOpenDeleteModal(true)
  }

  const handleDeletePost = async () => {
    if (!post) {
      return
    }

    try {
      await deletePost(post.id).unwrap()
      dispatch(clearSelectedPost())
      setOpenDeleteModal(false)
      dispatch(hidePostModal())
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
        }
      }}
      withoutHeader
    >
      <div className={s.container}>
        <Carousel images={images} />
        <div className={s.contentWrapper}>
          <div className={s.header}>
            <UserNameAndAvatar userName={post.user.username} />
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
                <span className={s.descriptionUserName}>{post.user.username}</span>{' '}
                <span>{post.description}</span>
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
