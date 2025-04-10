import { BASE_URL_API, Endpoints } from '@/shared'

export const fetchProfile = async (userId: string) => {
  const res = await fetch(`${BASE_URL_API}${Endpoints.profile}/${userId}`, {
    next: {
      revalidate: 3600,
      tags: [`profile-${userId}`],
    },
  })

  if (!res.ok) {
    const errorText = await res.text()

    console.error(`HTTP error! Status: ${res.status}, Response: ${errorText}`)
    throw new Error(`Profile fetch failed: ${res.status} ${errorText}`)
  }

  return res.json()
}

export const fetchPosts = async (userId: string, page: number) => {
  const res = await fetch(`${BASE_URL_API}${Endpoints.profilePosts}/${userId}?page=${page}`, {
    next: {
      revalidate: 3600,
      tags: [`posts-${userId}`],
    },
  })

  if (!res.ok) {
    throw new Error('Posts fetch failed')
  }

  return res.json()
}
