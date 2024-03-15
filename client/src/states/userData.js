import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "userData",
  storage,
};

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: {},
  },
  reducers: {
    change: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { change } = userDataSlice.actions;

const persistedReducer = persistReducer(persistConfig, userDataSlice.reducer);

export default persistedReducer;
