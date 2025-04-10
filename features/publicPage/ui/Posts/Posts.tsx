import { PostType } from '@/shared'

import s from './Posts.module.scss'

import { fetchPublicPost } from '../../api'
import { Post } from './Post'

export const Posts = async () => {
  let isError = false
  let posts: PostType[] = []

  try {
    posts = await fetchPublicPost()
  } catch {
    isError = true
  }

  return (
    <div className={s.posts}>
      {isError ? (
        <h3>No posts...</h3>
      ) : (
        posts.map(({ createdAt, description, id, photos, userId }) => (
          <Post
            description={description}
            key={id}
            photos={photos}
            postId={id}
            publicationTime={createdAt}
            userId={userId}
          />
        ))
      )}
    </div>
  )
}
