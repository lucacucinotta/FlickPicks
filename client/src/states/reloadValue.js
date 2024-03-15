import { createSlice } from "@reduxjs/toolkit";

export const reloadValueSlice = createSlice({
  name: "realodValue",
  initialState: {
    reloadValue: 0,
  },
  reducers: {
    change: (state) => {
      state.reloadValue = state.reloadValue + 1;
    },
  },
});

export const { change } = reloadValueSlice.actions;

export default reloadValueSlice.reducer;
