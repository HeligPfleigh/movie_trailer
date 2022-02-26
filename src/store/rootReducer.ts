import {configureStore} from '@reduxjs/toolkit';
import genreReducer from './slices/genreSlice';

export const store = configureStore({
  reducer: {
    genre: genreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
