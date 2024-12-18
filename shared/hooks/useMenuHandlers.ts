import { useNRouter } from './useNRouter'

export const useMenuHandlers = () => {
  const router = useNRouter()

  return [{ itemCallback: () => router.push('/statistics'), name: 'Statistics' }]
}
