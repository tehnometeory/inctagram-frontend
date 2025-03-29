'use client'

import { useEffect } from 'react'

import { setAccessToken } from '@/entities'
import { useAppDispatch, useAppSelector } from '@/shared'

import { useRefreshTokenMutation } from '../api'

type Props = {
  onLoaded: () => void
}

export const AuthInitializer = ({ onLoaded }: Props) => {
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.auth.accessToken)
  const [refreshToken] = useRefreshTokenMutation()

  useEffect(() => {
    if (token) {
      onLoaded()

      return
    }

    refreshToken()
      .unwrap()
      .then(res => {
        dispatch(setAccessToken(res.accessToken))
      })
      .catch(() => {
        dispatch(setAccessToken(''))
      })
      .finally(() => onLoaded())
  }, [dispatch, refreshToken, token, onLoaded])

  return null
}
