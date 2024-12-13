import { Middleware, MiddlewareAPI, isRejectedWithValue } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import { handleServerError } from '../lib'
import { ErrorsMessagesResponse } from '../types'

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => next => action => {
  if (isRejectedWithValue(action)) {
    const actionStatus = (action.payload as FetchBaseQueryError).status

    if (actionStatus === 500) {
      handleServerError(api.dispatch)
    } else if (actionStatus === 'FETCH_ERROR') {
      handleServerError(api.dispatch)
    }

    const errorsMessages = ((action.payload as FetchBaseQueryError).data as ErrorsMessagesResponse)
      .errorsMessages

    return next({ ...action, payload: errorsMessages })
  }

  return next(action)
}
