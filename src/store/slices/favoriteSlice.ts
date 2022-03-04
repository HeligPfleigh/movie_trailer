import {IActorOverview, IMediaOverview} from '@movie_trailer/core/types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IFavoriteState {
  movie: IMediaOverview[];
  tv: IMediaOverview[];
  person: IActorOverview[];
}

export const initialState: IFavoriteState = {
  movie: [],
  tv: [],
  person: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    toggleMediaFavorite: (
      state,
      action: PayloadAction<IMediaOverview & {type: 'movie' | 'tv'}>,
    ) => {
      const {type, ...media} = action.payload;
      const existedMedia = state[type].find(item => item.id === media.id);

      if (existedMedia) {
        state[type] = state[type].filter(item => item.id !== media.id);
      } else {
        state[type].push({...media, favorite: true});
      }
    },
    togglePersonFavorite: (state, action: PayloadAction<IActorOverview>) => {
      const existedPerson = state.person.find(
        item => item.id === action.payload.id,
      );

      if (existedPerson) {
        state.person = state.person.filter(
          item => item.id !== action.payload.id,
        );
      } else {
        state.person.push({...action.payload, favorite: true});
      }
    },
  },
});

export const {toggleMediaFavorite, togglePersonFavorite} =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
