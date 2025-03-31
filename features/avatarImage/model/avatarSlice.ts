import { createSlice } from '@reduxjs/toolkit'

const avatarSlice = createSlice({
  name: 'avatar',
  initialState: {
    url: null,
  },
  reducers: {
    setAvatar: (state, action) => {
      state.url = action.payload
    },
    clearAvatar: state => {
      state.url = null
    },
  },
})

export const { setAvatar, clearAvatar } = avatarSlice.actions
export const avatarReducer = avatarSlice.reducer
