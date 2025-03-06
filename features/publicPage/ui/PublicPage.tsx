import s from './PublicPage.module.scss'

import { Posts } from './Posts'
import { RegisteredUsers } from './RegisteredUsers'

export const PublicPage = () => {
  return (
    <div className={s.publicPage}>
      <RegisteredUsers />

      <Posts />
    </div>
  )
}
