import { createSlice } from "@reduxjs/toolkit";
import TransactionService from "../services/TransactionService";
import DataAccess from "../utility/DataAccess";

const initialState = {
  orderKey: "",
  transactionKey: "",
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    order: (state, action) => {
      state.orderKey = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { order } = dataSlice.actions;

export default dataSlice.reducer;
