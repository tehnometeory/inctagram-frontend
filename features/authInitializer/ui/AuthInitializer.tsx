'use client'

import { useEffect } from 'react'

import { setAccessToken, setIsAuthorized, useMeQuery } from '@/entities'
import { useAppDispatch, useAppSelector } from '@/shared'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { useRefreshTokenMutation } from '../api'

type Props = {
  onLoaded: () => void
}

export const AuthInitializer = ({ onLoaded }: Props) => {
  const { data, error, isLoading, refetch } = useMeQuery()
  const [refreshToken] = useRefreshTokenMutation()
  const dispatch = useAppDispatch()
  const token = useAppSelector(state => state.auth.accessToken)

  useEffect(() => {
    if (isLoading) {
      return
    }
    if (data) {
      if (!token) {
        refreshToken()
          .unwrap()
          .then(res => {
            dispatch(setIsAuthorized(true))
            dispatch(setAccessToken(res.accessToken))
            refetch()
          })
          .catch(() => dispatch(setIsAuthorized(false)))
          .finally(() => onLoaded())
      }
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
  }, [dispatch, data, error, refetch, refreshToken, isLoading, onLoaded, token])

  return null
}
