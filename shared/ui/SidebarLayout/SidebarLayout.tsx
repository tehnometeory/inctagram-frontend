import { ReactNode } from 'react'

import s from './SidebarLayout.module.scss'

export const SidebarLayout = ({ children }: { children: ReactNode }) => (
  <div className={s.container}>{children}</div>
)
