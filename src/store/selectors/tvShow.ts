import {
  IRecommendationMediaItem,
  ITodayMediaItem,
} from '@movie_trailer/core/types';
import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

export const aringTodayTvShowsSelector = createSelector(
  [
    (state: RootState) => state.tvShow.airingToday.results,
    (state: RootState) => state.genre.tvGenres,
  ],
  (tvShows, genres): Array<ITodayMediaItem> => {
    return tvShows.map(show => {
      const genre = genres
        .filter(item => show.genre_ids.includes(item.id))
        .map(item => item.name)
        .join('/ ');

      return {
        id: show.id,
        title: show.name,
        genres: genre,
        poster: show.poster_path,
        rating: show.vote_average,
      };
    });
  },
);

export const recommendationTvShowsSelector = createSelector(
  [
    (state: RootState) => state.tvShow.recommendation.results,
    (state: RootState) => state.genre.tvGenres,
  ],
  (tvShows, genres): Array<IRecommendationMediaItem> => {
    return tvShows.map(show => {
      const genre = genres
        .filter(item => show.genre_ids.includes(item.id))
        .map(item => item.name)
        .join('/ ');

      return {
        id: show.id,
        title: show.name,
        genres: genre,
        poster: show.poster_path,
        rating: show.vote_average,
        time: show.first_air_date,
      };
    });
  },
);
