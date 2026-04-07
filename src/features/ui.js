import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loadingCount: 0,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    loadingStart: (state) => {
      state.loadingCount += 1;
    },
    loadingEnd: (state) => {
      state.loadingCount = Math.max(0, state.loadingCount - 1);
    },
    loadingReset: (state) => {
      state.loadingCount = 0;
    },
  },
});

export const { loadingStart, loadingEnd, loadingReset } = uiSlice.actions;

