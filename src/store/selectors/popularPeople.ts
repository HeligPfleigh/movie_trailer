import {IActorOverview} from '@movie_trailer/core/types';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

export const popularPeopleSelector = createSelector(
  [
    (state: RootState) => state.popularPeople.data.results,
    (state: RootState) => state.favorite.person,
  ],
  (popularPeople, favoritePeople): Array<IActorOverview> => {
    const favoritePeopleIds = favoritePeople.map(person => person.id);

    return popularPeople.map(person => {
      const isFavorite = favoritePeopleIds.includes(person.id);

      return {
        ...person,
        favorite: isFavorite,
      };
    });
  },
);
