import React, { ChangeEvent, ReactNode, useCallback } from 'react'

import { useMeQuery } from '@/entities'
import { useUserProfileByIdQuery } from '@/features'
import { UserNameAndAvatar } from '@/shared'
import { TextArea } from '@rambo-react/ui-meteors'

import s from './DescriptionPost.module.scss'

type Props = {
  children: ReactNode
  description: string
  sendNewPostDescription: (newDescription: string) => void
  showSeparator?: boolean
}
export const DescriptionPost = ({
  children,
  description,
  sendNewPostDescription,
  showSeparator = false,
}: Props) => {
  const { data: me } = useMeQuery()
  const { username, avatarUrl } = useUserProfileByIdQuery(me?.id as string, {
    selectFromResult: ({ data }) => ({ username: data?.username, avatarUrl: data?.avatarUrl }),
  })
  const onChangeHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newDescription = event.currentTarget.value

      sendNewPostDescription(newDescription)
    },
    [sendNewPostDescription]
  )

  return (
    <div className={s.containerWrapper}>
      <div className={s.container}>
        <div className={s.userName}>
          <UserNameAndAvatar avatarUrl={avatarUrl} userName={username} />
        </div>
        <TextArea
          className={s.description}
          label={'Add publication descriptions'}
          maxLength={500}
          maxLengthVisible
          onChange={onChangeHandler}
          value={description || ''}
        />
        {showSeparator && <div className={s.separator} />}
        {children}
      </div>
    </div>
  )
}
