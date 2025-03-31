import { SelectedPost, fetchPost } from '@/features'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ postId: string; userId: string }>
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
