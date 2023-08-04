import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nameSurname: "",
  userId: ""
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes :).
      state.nameSurname = action.payload;
      state.userId = action.payload;

      console.log(state)

    }
  },
})

// Action creators are generated for each case reducer function
export const { login} = userSlice.actions

export default userSlice.reducer