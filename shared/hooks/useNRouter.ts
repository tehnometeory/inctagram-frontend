import { useRouter as useNprogressRouter } from 'next-nprogress-bar'

export const useNRouter = () => {
  const router = useNprogressRouter()

  return router
}
