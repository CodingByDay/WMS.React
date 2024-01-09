import { createSlice } from '@reduxjs/toolkit'
import TransactionService from '../services/TransactionService'
import DataAccess from "../utility/DataAccess";

const initialState = {
    currentObject: {},
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setting: (state, action) => {
      state.currentObject = action.payload
     
    }
  },
})

// Action creators are generated for each case reducer function
export const { setting } = dataSlice.actions

export default settingsSlice.reducer