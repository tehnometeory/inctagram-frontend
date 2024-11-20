import { setPasswordApi } from '@/features/new-password/model/api'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(setPasswordApi.middleware),
  reducer: {
    [setPasswordApi.reducerPath]: setPasswordApi.reducer,
  },
})

// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
