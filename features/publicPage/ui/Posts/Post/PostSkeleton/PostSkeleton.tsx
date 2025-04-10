import { Skeleton } from '@/shared'

import s from './PostSkeleton.module.scss'

export const PostSkeleton = () => {
  return <Skeleton className={s.skeleton} />
}
