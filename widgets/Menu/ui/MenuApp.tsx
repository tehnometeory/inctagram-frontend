import { useMenuHandlers } from '@/shared/hooks/useMenuHandlers'
import { Menu } from '@rambo-react/ui-meteors'

import s from './MenuApp.module.scss'

export const MenuApp = () => {
  const menuCallbacks = useMenuHandlers()

  return (
    <div className={s.menu}>
      <Menu callbacks={menuCallbacks} />
    </div>
  )
}
