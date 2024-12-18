import { removeAlert } from '@/entities'
import { useAppDispatch, useAppSelector } from '@/shared'
import { Alert } from '@rambo-react/ui-meteors'

import s from './AppAlert.module.scss'

export function AppAlert() {
  const { message, type } = useAppSelector(state => state.app.alert)
  const dispatch = useAppDispatch()

  const onCloseHandler = () => {
    dispatch(removeAlert())
  }

  return (
    <Alert
      className={s.appAlert}
      iconClose
      message={message}
      onClose={onCloseHandler}
      variant={type!}
    />
  )
}
