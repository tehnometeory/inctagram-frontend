import { BASE_URL_API, PostType } from '@/shared'

export const fetchNewestPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL_API}posts/newest-posts`, {
      next: {
        revalidate: 60,
      },
    })

    const posts = (await response.json()) as PostType[]

    return posts
  } catch (e) {
    console.error(e)
  }
}
