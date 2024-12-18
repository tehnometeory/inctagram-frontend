import { ReactNode } from 'react'

import s from './ContentContainer.module.scss'

type Props = {
  children: ReactNode
}

export const ContentContainer = ({ children }: Props) => {
  return <main className={s.container}>{children}</main>
}
