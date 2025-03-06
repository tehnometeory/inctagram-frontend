import { BASE_URL_API } from '@/shared'

export const fetchUsersCount = async () => {
  try {
    const response = await fetch(`${BASE_URL_API}users/count`, {
      next: {
        revalidate: 60,
      },
    })
    const { usersCount } = (await response.json()) as { usersCount: number }

    return usersCount
  } catch (e) {
    console.error(e)
  }
}
