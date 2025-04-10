import clsx from 'clsx'

import s from './Skeleton.module.scss'

type Props = {
  className: string
}

export const Skeleton = ({ className }: Props) => {
  return <div className={clsx(s.skeleton, className)} />
}
