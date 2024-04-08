import { createSlice } from "@reduxjs/toolkit";

export const chartsSlice = createSlice({
  name: "charts",
  initialState: {
    charts: [
      { name: "Daily Trending Movies" },
      { name: "Weekly Trending Movies" },
      { name: "Top Rated Movies" },
    ],
  },
});

export default chartsSlice.reducer;
