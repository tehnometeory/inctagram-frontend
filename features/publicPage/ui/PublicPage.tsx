import { Suspense } from 'react'

import s from './PublicPage.module.scss'

import { Posts, PostsSkeleton } from './Posts'
import { RegisteredUsers, RegisteredUsersSkeleton } from './RegisteredUsers'

export const PublicPage = () => {
  return (
    <div className={s.publicPage}>
      <Suspense fallback={<RegisteredUsersSkeleton />}>
        <RegisteredUsers />
      </Suspense>
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </div>
  )
}
