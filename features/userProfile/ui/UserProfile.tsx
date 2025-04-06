'use client'

import { useEffect, useState } from 'react'

import { useMeQuery } from '@/entities'
import { setAvatar, setUserName } from '@/features/profileInfo'
import { SelectedPost } from '@/features/selectedPost'
import { Loader, PostType, useAppDispatch, useAppSelector } from '@/shared'
import { Button } from '@rambo-react/ui-meteors'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './UserProfile.module.scss'

import { ProfileUserResponse } from '../api'
import { Post } from './Post'
import { StatItem } from './StateItem'

export const UserProfile = ({
  userId,
  posts,
  profile,
}: {
  userId?: string
  posts: PostType[]
  profile: ProfileUserResponse
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedPostId, setSelectedPostId] = useState<string | null>(searchParams.get('post'))
  const { data: me, isLoading } = useMeQuery()
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => !!state.auth.accessToken)

  useEffect(() => {
    dispatch(setAvatar(profile?.avatarUrl))
    dispatch(setUserName(profile?.username))
  }, [profile?.avatarUrl, dispatch, profile?.username])

  useEffect(() => {
    const post = searchParams.get('post')

    setSelectedPostId(post)
  }, [searchParams])

  if (isLoading) {
    return <Loader />
  }

  const isOwner = me?.id === userId

  const { aboutMe, postsCount, profileFollowers, profileFollowing, username, avatarUrl } = profile
  const selectedPost = posts.find(post => post.id === selectedPostId)

  return (
    <div className={s.userProfile}>
      <div className={s.profile}>
        <div className={clsx(s.item, s.itemImage)}>
          <Image
            alt={'user avatar'}
            className={s.avatar}
            height={204}
            priority
            src={avatarUrl || '/images/avatar-default.webp'}
            width={204}
          />
        </div>
        <div className={clsx(s.item, s.itemNameProfile)}>
          <span className={s.titleProfile}>{username}</span>

          {isOwner && (
            <Button
              onClick={() => router.push('/profile-info/general-information')}
              className={s.btn}
              variant={'secondary'}
            >
              Profile Settings
            </Button>
          )}
          {isAuth && !isOwner && (
            <div className={s.itemButtons}>
              <Button className={s.btn} variant={'secondary'}>
                Follow
              </Button>
              <Button className={s.btn} variant={'secondary'}>
                Send Message
              </Button>
            </div>
          )}
        </div>
        <div className={clsx(s.item, s.itemStaticProfile)}>
          <StatItem label={'Following'} value={profileFollowing} />
          <StatItem label={'Followers'} value={profileFollowers} />
          <StatItem label={'Publications'} value={postsCount} />
        </div>
        <div className={clsx(s.item, s.itemAboutMe)}>
          <p className={s.textInfo}>{aboutMe}</p>
        </div>
      </div>

      <div className={s.posts}>{posts?.map(post => <Post key={post.id} post={post} />)}</div>
      {selectedPost && <SelectedPost post={selectedPost} />}
    </div>
  )
}
