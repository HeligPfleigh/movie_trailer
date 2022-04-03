import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from 'redux';

import genreReducer from './slices/genreSlice';
import movieReducer from './slices/movieSlice';
import tvShowReducer from './slices/tvShowSlice';
import searchReducer from './slices/searchSlice';
import mediaListReducer from './slices/mediaListSlice';
import popularPeopleReducer from './slices/popularPeopleSlice';
import discoverReducer from './slices/discoverSlice';
import favoriteReducer from './slices/favoriteSlice';
import miscReducer from './slices/miscSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['favorite'],
};

export const rootReducer = combineReducers({
  genre: genreReducer,
  movie: movieReducer,
  tvShow: tvShowReducer,
  search: searchReducer,
  mediaList: mediaListReducer,
  popularPeople: popularPeopleReducer,
  discover: discoverReducer,
  favorite: favoriteReducer,
  misc: miscReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
