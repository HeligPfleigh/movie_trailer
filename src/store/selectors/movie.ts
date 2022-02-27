import {IMovieOverview} from '@movie_trailer/core/types';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

const getUpcommingMovies = (
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
  upcoming => getUpcommingMovies(upcoming.results),
);
