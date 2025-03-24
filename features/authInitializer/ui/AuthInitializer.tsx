'use client'

import { useEffect } from 'react'

import { setAccessToken, setIsAuthorized, useMeQuery } from '@/entities'
import { useAppDispatch } from '@/shared'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { useRefreshTokenMutation } from '../api'

type Props = {
  onLoaded: () => void
}

export const AuthInitializer = ({ onLoaded }: Props) => {
  const { data, error, isLoading, refetch } = useMeQuery()
  const [refreshToken] = useRefreshTokenMutation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (data) {
      dispatch(setIsAuthorized(true))
      onLoaded()
    } else if (error) {
      const err = error as FetchBaseQueryError

      if (err?.status === 401) {
        refreshToken()
          .unwrap()
          .then(res => {
            dispatch(setAccessToken(res.accessToken))
            refetch()
          })
          .catch(() => dispatch(setIsAuthorized(false)))
          .finally(() => onLoaded())
      } else {
        onLoaded()
      }
    }
  }, [dispatch, data, error, refetch, refreshToken, isLoading, onLoaded])

  return null
}
