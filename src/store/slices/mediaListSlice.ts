import {getMediaOverview, IMAGE_SERVER} from '@movie_trailer/core/apis';
import {
  IMediaOverview,
  IMovieOverview,
  IPagination,
  ITVOverview,
} from '@movie_trailer/core/types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

export type IMediaListState = IPagination & {results: Array<IMediaOverview>};

export const initialState: IMediaListState = {
  page: 0,
  total_pages: 0,
  total_results: 0,
  results: [],
};

export const loadInitialMediaList = createAsyncThunk(
  'mediaList/loadInitialMediaList',
  async (
    {
      type,
      subroute,
      params,
    }: {
      type: 'movie' | 'tv';
      subroute: 'top_rated' | 'upcoming' | 'airing_today' | 'now_playing';
      params?: Record<string, string | number | undefined>;
    },
    {getState},
  ) => {
    if (type === 'movie') {
      const data = await getMediaOverview<IMovieOverview>(
        'movie',
        subroute,
        params,
      );
      const genres = (getState() as RootState).genre.movieGenres;

      const movies = data.results.map(movie => {
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

      return {
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results,
        results: movies,
      };
    } else if (type === 'tv') {
      const data = await getMediaOverview<ITVOverview>('tv', subroute, params);
      const genres = (getState() as RootState).genre.tvGenres;

      const tvShows = data.results.map(show => {
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
        };
      });

      return {
        page: data.page,
        total_pages: data.total_pages,
        total_results: data.total_results,
        results: tvShows,
      };
    }

    return initialState;
  },
);

const mediaListSlice = createSlice({
  name: 'mediaList',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(loadInitialMediaList.fulfilled, (state, action) => {
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      state.total_results = action.payload.total_results;
      state.results = action.payload.results;
    });
  },
});

export const {} = mediaListSlice.actions;

export default mediaListSlice.reducer;
