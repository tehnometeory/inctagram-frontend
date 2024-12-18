import { setAlert } from '@/entities'

import { AppDispatch } from '../types'

export const handleServerError = (dispatch: AppDispatch) => {
  dispatch(setAlert({ message: 'Internal server error', type: 'error' }))
}
