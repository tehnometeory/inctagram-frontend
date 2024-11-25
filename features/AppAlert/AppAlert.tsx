import { useAppDispatch, useAppSelector } from '@/shared'
import { Alert } from '@rambo-react/ui-meteors'

export function AppAlert() {
  const { message, type } = useAppSelector(state => state.app.alert)
  const dispatch = useAppDispatch()

  const onCloseHandler = () => {}

  return message ? <Alert duration={5000} iconClose message={message} variant={type!} /> : null
}
