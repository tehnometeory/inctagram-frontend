import { useMenuHandlers } from '@/shared'
import { Sidebar } from '@rambo-react/ui-meteors'

import s from './SidebarApp.module.scss'

export const SidebarApp = () => {
  const sidebarCallbacks = useMenuHandlers()

  return (
    <div className={s.container}>
      <Sidebar callbacks={sidebarCallbacks} />
    </div>
  )
}
