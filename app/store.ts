import { signUpApi } from '@/features/SignUp/api/signUpApi'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(signUpApi.middleware),
  reducer: {
    reducer: () => ({}),
    [signUpApi.reducerPath]: signUpApi.reducer,
  },
})

// types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
