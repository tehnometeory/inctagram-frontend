'use client'

import { useState } from 'react'

import { setAccessToken, setAlert } from '@/entities'
import { RoutesApp, useAppDispatch, useNRouter } from '@/shared'

import { useLogoutMutation } from '../api'

export const useLogout = () => {
  const [logout, { isLoading }] = useLogoutMutation()
  const dispatch = useAppDispatch()
  const [showModalLogout, setShowModalLogout] = useState(false)
  const router = useNRouter()

  const handleCloseModal = () => setShowModalLogout(false)
  const handleConfirmLogout = async () => {
    await logout({})
      .unwrap()
      .then(() => {
        dispatch(setAlert({ message: 'Пользователь успешно вышел из системы', type: 'accepted' }))
        dispatch(setAccessToken(''))
        router.push(RoutesApp.signIn)
      })
      .catch(() => dispatch(setAlert({ message: 'Ошибка выхода из системы!', type: 'error' })))
      .finally(() => handleCloseModal())
  }

  return {
    handleCloseModal,
    handleConfirmLogout,
    isLoading,
    logoutItem: { itemCallback: () => setShowModalLogout(true), name: 'Log Out' },
    setShowModalLogout,
    showModalLogout,
  }
}
