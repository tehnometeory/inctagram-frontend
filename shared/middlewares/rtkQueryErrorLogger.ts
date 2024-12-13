import { setAlert } from '@/entities'
import { Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { ErrorsMessagesResponse } from '../types'

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => next => action => {
  if (isRejectedWithValue(action)) {
    const actionStatus = (action.payload as FetchBaseQueryError).status

    if (actionStatus === 500) {
      api.dispatch(setAlert({ message: 'Internal server error', type: 'error' }))
    } else if (actionStatus === 'FETCH_ERROR') {
      api.dispatch(setAlert({ message: 'Network error', type: 'error' }))
    }

    const errorsMessages = ((action.payload as FetchBaseQueryError).data as ErrorsMessagesResponse)
      .errorsMessages

    return next({ ...action, payload: errorsMessages })
  }

  return next(action)
}
