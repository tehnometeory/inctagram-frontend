import s from './PublicPage.module.scss'

import { fetchNewestPosts, fetchUsersCount } from '../api'
import { Posts } from './Posts'
import { RegisteredUsers } from './RegisteredUsers'

export const PublicPage = async () => {
  const [usersCount, posts] = await Promise.all([fetchUsersCount(), fetchNewestPosts()])

  return (
    <div className={s.publicPage}>
      <RegisteredUsers usersCount={usersCount} />

      <Posts posts={posts} />
    </div>
  )
}
