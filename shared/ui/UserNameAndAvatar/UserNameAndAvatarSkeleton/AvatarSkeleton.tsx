import { Skeleton } from '@/shared'

import s from './AvatarSkeleton.module.scss'

export const AvatarSkeleton = () => {
  return <Skeleton className={s.skeleton} />
}
