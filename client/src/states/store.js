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
import persistedLogReducer from "./log";
import burgerMenuReducer from "./burgerMenu";
import persistedGenresReducer from "./genres";
import movieSectionsReducer from "./movieSections";
import userDataReducer from "./userData";
import reloadValueReducer from "./reloadValue";

export const store = configureStore({
  reducer: {
    logState: persistedLogReducer,
    burgerMenuState: burgerMenuReducer,
    genresState: persistedGenresReducer,
    movieSectionsState: movieSectionsReducer,
    userDataState: userDataReducer,
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
