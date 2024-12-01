import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AuthState } from './types'

const initialState = { accessToken: '' } satisfies AuthState as AuthState

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
    },
  },
})

export const { setAccessToken } = authSlice.actions
export const authReducer = authSlice.reducer
