import {configureStore} from '@reduxjs/toolkit';
import genreReducer from './slices/genreSlice';
import movieReducer from './slices/movieSlice';
import tvShowReducer from './slices/tvShowSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    genre: genreReducer,
    movie: movieReducer,
    tvShow: tvShowReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
