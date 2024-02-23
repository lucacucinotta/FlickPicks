import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "genres",
  storage,
};

export const genresSlice = createSlice({
  name: "genres",
  initialState: {
    genresList: [],
  },
  reducers: {
    addGenres: (state, action) => {
      state.genresList = action.payload;
    },
  },
});

export const { addGenres } = genresSlice.actions;

const persistedReducer = persistReducer(persistConfig, genresSlice.reducer);

export default persistedReducer;
