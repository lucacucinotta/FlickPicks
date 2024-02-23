import { createSlice } from "@reduxjs/toolkit";

export const genresDropdownSlice = createSlice({
  name: "genresDropdown",
  initialState: {
    isGenresDropdownMenuOpen: false,
  },
  reducers: {
    openGenresDropdownMenu: (state) => {
      state.isGenresDropdownMenuOpen = true;
    },
    closeGenresDropdownMenu: (state) => {
      state.isGenresDropdownMenuOpen = false;
    },
  },
});

export const { openGenresDropdownMenu, closeGenresDropdownMenu } =
  genresDropdownSlice.actions;

export default genresDropdownSlice.reducer;
