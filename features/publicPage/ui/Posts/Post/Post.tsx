'use client'

import { useState } from 'react'

import { Carousel, Photo, getTimeAgo } from '@/shared'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import s from './Post.module.scss'

type Props = {
  avatar?: string
  description: string
  photos: Photo[]
  postId: string
  publicationTime: string
  userId: string
  username: string
}

export const Post = ({
  avatar,
  description,
  photos,
  postId,
  publicationTime,
  userId,
  username,
}: Props) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const onShowMoreClickHandler = () => setIsDescriptionExpanded(!isDescriptionExpanded)

  const descriptionText = isDescriptionExpanded ? description : description.slice(0, 100).trim()
  const descriptionEnding = isDescriptionExpanded ? ' ' : (description.length > 100 && '... ') || ''

  const photo =
    photos.length === 1 || isDescriptionExpanded ? (
      <Image alt={'avatar'} height={240} priority src={photos[0].url} width={240} />
    ) : (
      <Carousel images={photos.map(photo => photo.url)} miniVersion />
    )

  return (
    <div className={s.container}>
      <div className={s.publicPagePost}>
        <Link href={`/profile/${userId}?postId=${postId}`}>
          <div className={clsx(s.postImages, isDescriptionExpanded && s.hiden)}>{photo}</div>
        </Link>

        <div className={s.user}>
          <Image
            alt={'avatar'}
            className={s.avatar}
            height={36}
            priority
            src={avatar || '/images/avatar-default.webp'}
            width={36}
          />

          {username}
        </div>

        <span className={s.publicationTime}>{getTimeAgo(publicationTime)}</span>
      </div>

      <p className={s.description}>
        {descriptionText + descriptionEnding}

        {description.length > 100 && (
          <button className={s.showMore} onClick={onShowMoreClickHandler} type={'button'}>
            {isDescriptionExpanded ? 'Hide' : 'Show more'}
          </button>
        )}
      </p>
    </div>
  )
}
