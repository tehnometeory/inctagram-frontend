export const fetchProfile = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}profile/${userId}`, {
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_API}posts/profile-posts/${userId}?page=${page}`,
    {
      next: {
        revalidate: 3600,
        tags: [`posts-${userId}`],
      },
    }
  )

  if (!res.ok) {
    throw new Error('Posts fetch failed')
  }

  return res.json()
}

export const fetchPost = async (postId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}posts/${postId}`, {
    next: {
      revalidate: 3600,
      tags: [`post-${postId}`],
    },
  })

  if (!res.ok) {
    throw new Error('Posts fetch failed')
  }

  return res.json()
}
