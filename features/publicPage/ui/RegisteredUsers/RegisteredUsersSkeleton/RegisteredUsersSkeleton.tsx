import { Skeleton } from '@/shared'

import s from './RegisteredUsersSkeleton.module.scss'

export const RegisteredUsersSkeleton = () => {
  return <Skeleton className={s.skeleton} />
}
