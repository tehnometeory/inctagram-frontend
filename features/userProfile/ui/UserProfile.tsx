'use client'

import { useMeQuery } from '@/entities'
import { Loader, PostType, useAppSelector } from '@/shared'
import { Button } from '@rambo-react/ui-meteors'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import s from './UserProfile.module.scss'

import { ProfileUserResponse, useProfileByIdPostsQuery, useUserProfileByIdQuery } from '../api'
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
  selectedPostId?: string
}) => {
  const router = useRouter()
  const { data: me, isLoading } = useMeQuery()
  const isAuth = useAppSelector(state => !!state.auth.accessToken)

  // const { data } = useUserProfileByIdQuery(userId as string)

  // const { data: posts } = useProfileByIdPostsQuery({ id: userId as string, page: 1 })

  if (isLoading) {
    return <Loader />
  }

  const isOwner = me?.id === userId

  const { aboutMe, postsCount, profileFollowers, profileFollowing, username, avatarUrl } = profile

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
    </div>
  )
}
