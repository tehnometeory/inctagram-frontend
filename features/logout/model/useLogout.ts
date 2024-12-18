import { setAccessToken, setAlert, setIsAuthorized } from '@/entities'
import { useAppDispatch } from '@/shared'

import { useLogoutMutation } from '../api'

export const useLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation()

  const dispatch = useAppDispatch()
  const logoutHandler = async () => {
    try {
      await logout({}).unwrap()

      dispatch(setAccessToken(''))
      dispatch(setIsAuthorized(false))
      dispatch(setAlert({ message: 'Пользователь успешно вышел из системы', type: 'accepted' }))
    } catch (error) {
      dispatch(setAlert({ message: 'Ошибка выхода из системы!', type: 'error' }))
    }
  }

  return { isLoading, logoutItem: { itemCallback: logoutHandler, name: 'Log Out' } }
}
