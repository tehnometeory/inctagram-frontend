import { useNRouter } from '@/shared'

export const useHeaderActions = () => {
  const router = useNRouter()

  return {
    logInHandler: () => router.push('/auth/sign-in'),
    onSelectValueChange: () => {},
    signUpHandler: () => router.push('/auth/sign-up'),
    titleHandler: () => router.push('/'),
  }
}
