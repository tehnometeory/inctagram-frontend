import { Skeleton } from '@/shared'

import s from './NameSkeleton.module.scss'

export const NameSkeleton = () => {
  return <Skeleton className={s.skeleton} />
}
