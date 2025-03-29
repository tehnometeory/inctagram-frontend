'use client'

import { useMeQuery } from '@/entities'
import { Loader, useAppSelector } from '@/shared'
import { Button } from '@rambo-react/ui-meteors'
import { clsx } from 'clsx'
import Image from 'next/image'

import s from './UserProfile.module.scss'

import { useProfileByIdPostsQuery, useUserProfileByIdQuery } from '../api'
import { Post } from './Post'

export const UserProfile = ({ userId }: { userId?: string }) => {
  const { data: me, isLoading } = useMeQuery()
  const isAuth = useAppSelector(state => !!state.auth.accessToken)

  const { data } = useUserProfileByIdQuery(userId as string)

  const { data: posts } = useProfileByIdPostsQuery({ id: userId as string, page: 1 })

  if (isLoading) {
    return <Loader />
  }

  if (!data) {
    return null
  }
  const isOwner = me?.id === userId

  const { aboutMe, postsCount, profileFollowers, profileFollowing, username } = data

  return (
    <div className={s.userProfile}>
      <div className={s.profile}>
        <div className={clsx(s.item, s.itemImage)}>
          <Image
            alt={'user avatar'}
            className={s.avatar}
            height={204}
            priority
            src={'/images/avatar-default.webp'}
            width={204}
          />
        </div>
        <div className={clsx(s.item, s.itemNameProfile)}>
          <span className={s.titleProfile}>{username}</span>

          {isOwner && (
            <Button className={s.btn} variant={'secondary'}>
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
          <span className={s.statistic}>
            {profileFollowing}
            <br />
            <small className={s.textStatistic}>Following</small>
          </span>
          <span className={s.statistic}>
            {profileFollowers} <br />
            <small className={s.textStatistic}> Followers</small>
          </span>
          <span className={s.statistic}>
            {postsCount}
            <br /> <small className={s.textStatistic}>Publications</small>
          </span>
        </div>
        <div className={clsx(s.item, s.itemAboutMe)}>
          <p className={s.textInfo}>{aboutMe}</p>
        </div>
      </div>
      <div className={s.posts}>{posts?.map(post => <Post key={post.id} post={post} />)}</div>
    </div>
  )
}
