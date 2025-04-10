import { Fragment } from 'react'

import { BASE_URL_API } from '@/shared'

import s from './RegisteredUsers.module.scss'

export const RegisteredUsers = async () => {
  let isError = false
  let numbersArray: string[] = []

  try {
    const response = await fetch(`${BASE_URL_API}users/count`, {
      next: {
        revalidate: 60,
      },
    })
    const { usersCount } = (await response.json()) as { usersCount: number }

    numbersArray = usersCount.toString().split('')
  } catch {
    isError = true
  }

  while (numbersArray.length !== 6) {
    numbersArray.unshift('0')
  }

  return (
    <div className={s.registeredUsers}>
      Registered users:
      <div className={s.counter}>
        {numbersArray.map((num, i) => (
          <Fragment key={`${num}${i}`}>
            {num}
            {i !== numbersArray.length - 1 && <div className={s.separator} />}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
