import { appReducer, authReducer } from '@/entities'
import { createPostReducer, selectedPostReducer } from '@/features'
import { baseApi, rtkQueryErrorLogger } from '@/shared'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(baseApi.middleware, rtkQueryErrorLogger),
  reducer: {
    app: appReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    createPost: createPostReducer,
    selectedPost: selectedPostReducer,
  },
})
