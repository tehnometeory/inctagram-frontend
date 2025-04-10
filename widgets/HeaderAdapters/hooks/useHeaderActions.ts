import { RoutesApp, useNRouter } from '@/shared'

export const useHeaderActions = () => {
  const router = useNRouter()

  return {
    logInHandler: () => router.push(RoutesApp.signIn),
    onSelectValueChange: () => {},
    signUpHandler: () => router.push(RoutesApp.signUp),
    titleHandler: () => router.push('/'),
  }
}
