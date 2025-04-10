import { useMeQuery } from '@/entities'
import { LogOutModal, showModal, useLogout } from '@/features'
import { RoutesApp, useAppDispatch, useNRouter } from '@/shared'
import { Sidebar } from '@rambo-react/ui-meteors'

import s from './SidebarApp.module.scss'

export const SidebarApp = () => {
  const { handleCloseModal, handleConfirmLogout, logoutItem, showModalLogout } = useLogout()
  const dispatch = useAppDispatch()

  const router = useNRouter()
  const { data } = useMeQuery()

  const sidebarCallbacks = [
    { itemCallback: () => router.push(RoutesApp.home), name: 'Home' },
    { itemCallback: () => router.push('/statistics'), name: 'Statistics' },
    {
      itemCallback: () => router.push(`${RoutesApp.profile}/${data?.id}`),
      name: 'My Profile',
    },
    logoutItem,
    {
      itemCallback: () => dispatch(showModal()),
      name: 'Create',
    },
  ]

  return (
    <div className={s.container}>
      <Sidebar callbacks={sidebarCallbacks} />
      <LogOutModal
        isOpen={showModalLogout}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </div>
  )
}
