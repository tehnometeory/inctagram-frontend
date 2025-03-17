import { PostType } from '@/shared'
import clsx from 'clsx'
import Image from 'next/image'

import s from './UserProfile.module.scss'

import { ProfileUserResponse } from '../api'
import { Post } from './Post'
import { StatItem } from './StateItem'

export async function UserProfile({
  posts,
  profile,
}: {
  posts: PostType[]
  profile: ProfileUserResponse
  selectedPostId?: string
}) {
  const { aboutMe, postsCount, profileFollowers, profileFollowing, username } = profile

  return (
    <div className={s.userProfile}>
      <div className={s.profile}>
        <div className={clsx(s.item, s.itemImage)}>
          <Image
            alt={profile.username}
            className={'rounded-full'}
            height={150}
            src={'/images/avatar-default.webp'}
            width={150}
          />
        </div>
        <div className={clsx(s.item, s.itemNameProfile)}>
          <span className={s.titleProfile}>{username}</span>
          {/* <Button className={s.btn} variant={'secondary'}>
            Profile Settings
          </Button> */}
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
