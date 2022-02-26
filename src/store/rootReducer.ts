import {configureStore} from '@reduxjs/toolkit';
import genreReducer from './slices/genreSlice';
import movieReducer from './slices/movieSlice';

export const store = configureStore({
  reducer: {
    genre: genreReducer,
    movie: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
