import { SelectedPost } from '@/features'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{
    postId: string
    userId: string
  }>
}

export default async function PostModal({ params }: Props) {
  const { postId } = await params

  try {
    const selectedPost = await fetchPost(postId)

    return <SelectedPost post={selectedPost} />
  } catch (error) {
    notFound()
  }
}

const fetchPost = async (postId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}posts/${postId}`, {
    next: {
      tags: [`post-${postId}`],
    },
  })

  if (!res.ok) {
    throw new Error('Posts fetch failed')
  }

  return res.json()
}
