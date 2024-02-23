import { createSlice } from "@reduxjs/toolkit";

export const burgerMenuSlice = createSlice({
  name: "burgerMenu",
  initialState: {
    isShown: false,
  },
  reducers: {
    showBurgerMenu: (state) => {
      state.isShown = true;
    },
    hideBurgerMenu: (state) => {
      state.isShown = false;
    },
  },
});

export const { showBurgerMenu, hideBurgerMenu } = burgerMenuSlice.actions;

export default burgerMenuSlice.reducer;
