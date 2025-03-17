import { ProfileUserPostsResponse, ProfileUserResponse, fetchPosts, fetchProfile } from '@/features'
import { UserProfile } from '@/features/userProfile/ui/UserProfile'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ userId: string }>
  searchParams: Promise<{ postId: string }>
}

export default async function ProfilePage({ params }: Props) {
  const { userId } = await params

  try {
    const [posts, profile]: [ProfileUserPostsResponse, ProfileUserResponse] = await Promise.all([
      fetchPosts(userId, 1),
      fetchProfile(userId),
    ])

    return (
      <>
        <UserProfile posts={posts} profile={profile} />
      </>
    )
  } catch (error) {
    notFound()
  }
}
