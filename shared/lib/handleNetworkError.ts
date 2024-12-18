import { setAlert } from '@/entities'

import { AppDispatch } from '../types'

export const handleNetworkError = (dispatch: AppDispatch) => {
  dispatch(setAlert({ message: 'Network error', type: 'error' }))
}
