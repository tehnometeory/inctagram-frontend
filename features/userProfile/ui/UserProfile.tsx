'use client'

import { useEffect, useState } from 'react'

import { useMeQuery } from '@/entities'
import { SelectedPost } from '@/features/selectedPost'
import { Loader, PostType, useAppSelector, Endpoints } from '@/shared'
import { Button } from '@rambo-react/ui-meteors'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

import s from './UserProfile.module.scss'

import { ProfileUserResponse, useUserProfileByIdQuery, useProfileByIdPostsQuery } from '../api'
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
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const { data: me, isLoading } = useMeQuery()
  const isAuth = useAppSelector(state => !!state.auth.accessToken)

  const { data: freshProfile } = useUserProfileByIdQuery(userId!, {
    skip: !userId,
  })
  const { data: freshPostsData } = useProfileByIdPostsQuery(
    { id: userId!, page: 1 },
    {
      skip: !userId,
    }
  )

  const currentPosts = freshPostsData || posts

  const currentProfile = freshProfile || profile

  useEffect(() => {
    const post = searchParams.get('post')

    setSelectedPostId(post)
  }, [searchParams])

  if (isLoading) {
    return <Loader />
  }

  const isOwner = me?.id === userId

  const { aboutMe, postsCount, profileFollowers, profileFollowing, username, avatarUrl } =
    currentProfile

  const selectedPost = currentPosts.find(post => post.id === selectedPostId)

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
              onClick={() => router.push(`${Endpoints.profileInfoGeneralInformation}`)}
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

      <div className={s.posts}>{currentPosts?.map(post => <Post key={post.id} post={post} />)}</div>
      {selectedPost && <SelectedPost post={selectedPost} />}
    </div>
  )
}
