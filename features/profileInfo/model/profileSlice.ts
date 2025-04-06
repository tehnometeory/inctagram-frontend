import { createSlice } from '@reduxjs/toolkit'

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    avatarUrl: null,
    userName: 'ProfileName',
  },
  reducers: {
    setUserName: (state, action) => {
      state.userName = action.payload
    },
    setAvatar: (state, action) => {
      state.avatarUrl = action.payload
    },
    clearAvatar: state => {
      state.avatarUrl = null
    },
  },
})

export const { setAvatar, clearAvatar, setUserName } = profileSlice.actions
export const profileReducer = profileSlice.reducer
