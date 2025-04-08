import Image from 'next/image'

import s from './UserNameAndAvatar.module.scss'

type Props = {
  userName?: string
  avatarUrl?: string
}

export const UserNameAndAvatar = ({ userName, avatarUrl }: Props) => {
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
