import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {IMovieOverview, IMediaOverview} from '@movie_trailer/core/types';
import {createSelector} from '@reduxjs/toolkit';
import chunk from 'lodash/chunk';

import {RootState} from '../rootReducer';

const getUpcomingMovies = (
  movies: Array<IMovieOverview>,
): Array<Array<IMovieOverview>> => {
  const displayMovies: IMovieOverview[][] = [];

  let tmp: IMovieOverview[] = [];
  movies.forEach((movie, index) => {
    if (index % 3 === 0) {
      if (tmp.length) {
        displayMovies.push(tmp);
      }
      displayMovies.push([movie]);
      tmp = [];
    } else {
      tmp.push(movie);
    }
  });
  return displayMovies;
};

export const upcomingMoviesSelector = createSelector(
  [(state: RootState) => state.movie.upcoming],
  upcoming => getUpcomingMovies(upcoming.results),
);

export const todayMoviesSelector = createSelector(
  [
    (state: RootState) => state.movie.nowPlaying.results,
    (state: RootState) => state.genre.movieGenres,
  ],
  (movies, genres): Array<IMediaOverview> => {
    return movies.map(movie => {
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
      };
    });
  },
);

export const recommendationMoviesSelector = createSelector(
  [
    (state: RootState) => state.movie.recommendation.results,
    (state: RootState) => state.genre.movieGenres,
  ],
  (movies, genres): Array<Array<IMediaOverview>> => {
    const medias = movies.map(movie => {
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
      };
    });

    return chunk(medias, 2);
  },
);
