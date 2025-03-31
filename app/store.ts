import { appReducer, authReducer } from '@/entities'
import { createPostReducer, selectedPostReducer } from '@/features'
import { avatarReducer } from '@/features/avatarImage'
import { loadingReducer } from '@/features/loadingBar/model/loadingSlice'
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
    loading: loadingReducer,
    selectedPost: selectedPostReducer,
    avatarPhoto: avatarReducer,
  },
})
