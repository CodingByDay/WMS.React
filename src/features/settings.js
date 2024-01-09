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
    setCurrentSetting: (state, action) => {
      state.currentObject = action.payload[0]
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCurrentSetting } = settingsSlice.actions

export default settingsSlice.reducer