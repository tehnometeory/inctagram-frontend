import { PostType } from '@/shared'
import Image from 'next/image'
import Link from 'next/link'

import s from './Post.module.scss'

type Props = {
  post: PostType
}

export const Post = ({ post }: Props) => {
  const imageUrl = post.photos?.[0]?.url

  if (!imageUrl) {
    return null
  }

  return (
    <div className={s.post} key={post.id}>
      <Link
        className={s.post}
        href={`/profile/${post.userId}/?post=${post.id}`}
        prefetch
        scroll={false}
      >
        <Image
          alt={`Post image ${post.id}`}
          className={s.imagePost}
          height={228}
          priority
          src={imageUrl}
          width={234}
        />
      </Link>
    </div>
  )
}
