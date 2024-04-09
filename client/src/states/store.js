import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import burgerMenuReducer from "./burgerMenu";
import persistedGenresReducer from "./genres";
import chartsReducer from "./charts";
import reloadValueReducer from "./reloadValue";

export const store = configureStore({
  reducer: {
    burgerMenuState: burgerMenuReducer,
    genresState: persistedGenresReducer,
    chartsState: chartsReducer,
    reloadValueState: reloadValueReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
