import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { Alert, AppState } from './types'

const initialState: AppState = { alert: { message: '', type: null } }

const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    removeAlert(state) {
      state.alert.message = ''
      state.alert.type = null
    },
    setAlert(state, action: PayloadAction<Alert>) {
      state.alert = action.payload
    },
  },
})

export const { removeAlert, setAlert } = appSlice.actions
export const appReducer = appSlice.reducer
