import s from './PostsSkeleton.module.scss'

import { PostSkeleton } from '../Post'

export const PostsSkeleton = () => {
  return (
    <div className={s.skeleton}>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </div>
  )
}
