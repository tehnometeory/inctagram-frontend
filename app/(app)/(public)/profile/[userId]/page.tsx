import { ProfileUserPostsResponse, ProfileUserResponse, fetchPosts, fetchProfile } from '@/features'
import { UserProfile } from '@/features/userProfile/ui/UserProfile'
import { notFound } from 'next/navigation'

type Props = {
  params: Promise<{ userId: string }>
}

export default async function ProfilePage({ params }: Props) {
  const { userId } = await params

  try {
    const [profile, posts]: [ProfileUserResponse, ProfileUserPostsResponse] = await Promise.all([
      fetchProfile(userId),
      fetchPosts(userId, 1),
    ])

    return <UserProfile userId={userId as string} posts={posts} profile={profile} />
  } catch (error) {
    notFound()
  }
}
