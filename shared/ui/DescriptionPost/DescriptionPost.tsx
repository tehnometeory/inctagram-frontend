import React, { ChangeEvent, ReactNode, useCallback } from 'react'

import { UserNameAndAvatar } from '@/shared'
import { TextArea } from '@rambo-react/ui-meteors'

import s from './DescriptionPost.module.scss'

type Props = {
  children: ReactNode
  description: string
  sendNewPostDescription: (newDescription: string) => void
  showSeparator?: boolean
  userName?: string
}
export const DescriptionPost = ({
  children,
  description,
  sendNewPostDescription,
  showSeparator = false,
  userName = 'URLProfiele',
}: Props) => {
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
        <UserNameAndAvatar userName={userName} />
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
