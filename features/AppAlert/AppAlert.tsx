import { removeAlert } from '@/entities'
import { useAppDispatch, useAppSelector } from '@/shared'
import { Alert } from '@rambo-react/ui-meteors'

export function AppAlert() {
  const { message, type } = useAppSelector(state => state.app.alert)
  const dispatch = useAppDispatch()

  const onCloseHandler = () => {
    dispatch(removeAlert())
  }

  return (
    <Alert
      iconClose
      message={message}
      onClose={onCloseHandler}
      styles={{
        bottom: '24px',
        left: '173px',
      }}
      variant={type!}
    />
  )
}
