import { BASE_URL_API, Endpoints } from '@/shared'

export const fetchPublicPost = async () => {
  const res = await fetch(`${BASE_URL_API}${Endpoints.newestPosts}`, {
    next: {
      revalidate: 60,
      tags: [`posts`],
    },
  })

  if (!res.ok) {
    throw new Error('Posts fetch failed')
  }

  return res.json()
}
