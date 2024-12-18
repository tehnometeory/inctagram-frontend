import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuthState } from './types'

const initialState: AuthState = { accessToken: '', isAuthorized: false }

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
    },
    setIsAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload
    },
  },
})

export const { setAccessToken, setIsAuthorized } = authSlice.actions
export const authReducer = authSlice.reducer
