import { createSlice } from "@reduxjs/toolkit";

export const movieSectionsSlice = createSlice({
  name: "movieSections",
  initialState: {
    movieSections: [
      { name: "Daily Trending Movies" },
      { name: "Weekly Trendig Movies" },
      { name: "Top Rated Movies" },
    ],
  },
  reducers: {
    addMovieSections: (state, action) => {
      state.movieSections = action.payload;
    },
  },
});

export const { addMovieSections } = movieSectionsSlice.actions;

export default movieSectionsSlice.reducer;
