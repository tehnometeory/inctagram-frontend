import Image from 'next/image'

import s from './UserNameAndAvatar.module.scss'

export const UserNameAndAvatar = ({ userName }: { userName: string }) => {
  return (
    <div className={s.avaWrapper}>
      <Image
        alt={'userAvatar'}
        className={s.ava}
        height={36}
        src={'public/images/test_userAvatar.png'}
        width={36}
      />
      <span className={s.urlProfile}>{userName}</span>
    </div>
  )
}
