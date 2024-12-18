'use client'

import { useEffect } from 'react'
import { FieldValues, Path, UseFormSetError } from 'react-hook-form'

import { ErrorMessage } from '../types'
import { useAppDispatch } from './useAppDispatch'

export const useFormErrorsHandler = <T extends FieldValues>(
  error: ErrorMessage[],
  setError: UseFormSetError<T>
) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (error) {
      error.forEach(({ field, message }) => {
        setError(field as Path<T>, { message })
      })
    }
  }, [setError, dispatch, error])
}
