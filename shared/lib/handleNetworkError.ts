import { setAlert } from '@/entities'

import { AppDispatch } from '../types'

export const handleNetworkError = (dispatch: AppDispatch): void => {
  dispatch(setAlert({ message: 'Network error', type: 'error' }))
}
