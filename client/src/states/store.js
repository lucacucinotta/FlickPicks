import { configureStore } from "@reduxjs/toolkit";
import persistedLogReducer from "./log";
import { persistStore } from "redux-persist";
import burgerMenuReducer from "./burgerMenu";
import movieDropdownReducer from "./movieDropdown";
import genresDropdownReducer from "./genresDropdown";
import persistedGenresReducer from "./genres";
import movieSectionsReducer from "./movieSections";

export const store = configureStore({
  reducer: {
    logState: persistedLogReducer,
    burgerMenuState: burgerMenuReducer,
    movieDropdownState: movieDropdownReducer,
    genresDropdownState: genresDropdownReducer,
    genresState: persistedGenresReducer,
    movieSectionsState: movieSectionsReducer,
  },
});

export const persistor = persistStore(store);
