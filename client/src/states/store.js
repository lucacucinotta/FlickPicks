import { configureStore } from "@reduxjs/toolkit";
import persistedLogReducer from "./log";
import { persistStore } from "redux-persist";
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
});

export const persistor = persistStore(store);
