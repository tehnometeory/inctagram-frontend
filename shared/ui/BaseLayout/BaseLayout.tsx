import { ReactNode } from 'react'

import s from './BaseLayout.module.scss'

export const BaseLayout = ({ children }: { children: ReactNode }) => (
  <div className={s.layout}>{children}</div>
)
