import { createSlice } from "@reduxjs/toolkit";

export const movieDropdownSlice = createSlice({
  name: "movieDropdown",
  initialState: {
    isMovieDropdownMenuOpen: false,
  },
  reducers: {
    openMovieDropdownMenu: (state) => {
      state.isMovieDropdownMenuOpen = true;
    },
    closeMovieDropdownMenu: (state) => {
      state.isMovieDropdownMenuOpen = false;
    },
  },
});

export const { openMovieDropdownMenu, closeMovieDropdownMenu } =
  movieDropdownSlice.actions;

export default movieDropdownSlice.reducer;
