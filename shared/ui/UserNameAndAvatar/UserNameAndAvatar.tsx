import Image from 'next/image'

import s from './UserNameAndAvatar.module.scss'

import { AvatarSkeleton, NameSkeleton } from './UserNameAndAvatarSkeleton'

type Props = {
  userName?: string
  avatarUrl?: string
  isLoading?: boolean
}

export const UserNameAndAvatar = ({ userName, avatarUrl, isLoading }: Props) => {
  return (
    <div className={s.avaWrapper}>
      {isLoading ? (
        <AvatarSkeleton />
      ) : (
        <Image
          alt={'userAvatar'}
          className={s.ava}
          height={36}
          src={avatarUrl ?? '/images/avatar-default.webp'}
          width={36}
        />
      )}
      {isLoading ? <NameSkeleton /> : <span className={s.urlProfile}>{userName}</span>}
    </div>
  )
}
