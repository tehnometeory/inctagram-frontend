'use client'

import { PostType } from '@/shared'

import s from './Posts.module.scss'

import { Post } from './Post'

type Props = {
  posts?: PostType[]
}

export const Posts = ({ posts }: Props) => {
  if (!posts || posts.length === 0) {
    return <h3>No posts...</h3>
  }

  return (
    <div className={s.posts}>
      {posts.map(({ createdAt, description, id, photos, user: { username }, userId }) => (
        <Post
          description={description}
          key={id}
          photos={photos}
          postId={id}
          publicationTime={createdAt}
          userId={userId}
          username={username}
        />
      ))}
    </div>
  )
}
