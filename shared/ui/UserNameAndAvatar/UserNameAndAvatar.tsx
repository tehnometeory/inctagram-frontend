import { useAppSelector } from '@/shared/hooks'
import Image from 'next/image'

import s from './UserNameAndAvatar.module.scss'

export const UserNameAndAvatar = () => {
  const { avatarUrl, userName } = useAppSelector(state => state.profile)

  return (
    <div className={s.avaWrapper}>
      <Image
        alt={'userAvatar'}
        className={s.ava}
        height={36}
        src={avatarUrl ?? '/images/avatar-default.webp'}
        width={36}
      />
      <span className={s.urlProfile}>{userName}</span>
    </div>
  )
}
