'use client'

import { Fragment } from 'react'

import s from './RegisteredUsers.module.scss'

type Props = {
  usersCount?: number
}

export const RegisteredUsers = ({ usersCount }: Props) => {
  const numbersArray = usersCount ? usersCount.toString().split('') : ['6']

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
