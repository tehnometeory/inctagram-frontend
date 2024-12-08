'use client'

import { useEffect } from 'react'

import { setAccessToken, setIsAuthorized } from '@/entities'
import { handleNetworkError, handleServerError, useAppDispatch } from '@/shared'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { useRefreshTokensMutation } from '../api'

export const AuthInitializer = () => {
  const [refreshTokens] = useRefreshTokensMutation()

  const dispatch = useAppDispatch()

  useEffect(() => {
    refreshTokens()
      .unwrap()
      .then(res => {
        dispatch(setAccessToken(res.accessToken))
        dispatch(setIsAuthorized(true))
      })
      .catch(e => {
        const err = e as FetchBaseQueryError

        if (!err) {
          handleNetworkError(dispatch)
        } else if (err.status === 500) {
          handleServerError(dispatch)
        }
      })
  }, [dispatch])

  return null
}
