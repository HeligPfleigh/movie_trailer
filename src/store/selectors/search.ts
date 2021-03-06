import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {IActorOverview, IMediaOverview} from '@movie_trailer/core/types';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

export const movieSearchResultSelector = createSelector(
  [
    (state: RootState) => state.search.movie.results,
    (state: RootState) => state.genre.movieGenres,
    (state: RootState) => state.favorite.movie,
  ],
  (results, genres, favoriteMovies): Array<IMediaOverview> => {
    const favoriteMovieIds = favoriteMovies.map(movie => movie.id);
    return results.map(movie => {
      const genre = genres
        .filter(item => movie.genre_ids.includes(item.id))
        .map(item => item.name)
        .join('/ ');

      return {
        id: movie.id,
        title: movie.title,
        genres: genre,
        poster: `${IMAGE_SERVER}${movie.poster_path}`,
        rating: movie.vote_average,
        time: movie.release_date,
        favorite: favoriteMovieIds.indexOf(movie.id) !== -1,
      };
    });
  },
);

export const tvSearchResultSelector = createSelector(
  [
    (state: RootState) => state.search.tv.results,
    (state: RootState) => state.genre.movieGenres,
    (state: RootState) => state.favorite.tv,
  ],
  (results, genres, favoriteTVs): Array<IMediaOverview> => {
    const favoriteTVIds = favoriteTVs.map(tv => tv.id);
    return results.map(show => {
      const genre = genres
        .filter(item => show.genre_ids.includes(item.id))
        .map(item => item.name)
        .join('/ ');

      return {
        id: show.id,
        title: show.name,
        genres: genre,
        poster: `${IMAGE_SERVER}${show.poster_path}`,
        rating: show.vote_average,
        time: show.first_air_date,
        favorite: favoriteTVIds.indexOf(show.id) !== -1,
      };
    });
  },
);

export const actorSearchResultSelector = createSelector(
  [
    (state: RootState) => state.search.person.results,
    (state: RootState) => state.favorite.person,
  ],
  (results, favoritePeople): Array<IActorOverview> => {
    const favoritePeopleIds = favoritePeople.map(person => person.id);

    return results.map(actor => ({
      id: actor.id,
      name: actor.name,
      thumbnail: `${IMAGE_SERVER}${actor.profile_path}`,
      department: actor.known_for_department,
      favorite: favoritePeopleIds.indexOf(actor.id) !== -1,
    }));
  },
);
