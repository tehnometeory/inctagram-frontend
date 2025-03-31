import { createSlice } from '@reduxjs/toolkit'

export type LoadingState = {
  request: number
}

const initialState: LoadingState = {
  request: 0,
}

const loadingSlice = createSlice({
  extraReducers: builder => {
    builder
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.request += 1
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected'),
        state => {
          state.request = Math.max(0, state.request - 1)
        }
      )
  },
  initialState,
  name: 'loading',
  reducers: {},
})

export const loadingReducer = loadingSlice.reducer
