'use client'

import { useEffect } from 'react'

import { Button } from '@rambo-react/ui-meteors'

import s from './Error.module.scss'

export default function Error({
  error,
  reset,
}: {
  error: { digest?: string } & Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className={s.error}>
      <h2>Something went wrong!</h2>

      <Button onClick={() => reset()} type={'button'}>
        Try again
      </Button>
    </main>
  )
}
