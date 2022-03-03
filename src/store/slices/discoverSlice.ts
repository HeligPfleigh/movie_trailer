import {
  getMediaOverviewByDiscover,
  IMAGE_SERVER,
} from '@movie_trailer/core/apis';
import {
  IMediaOverview,
  IMovieOverview,
  IPagination,
  ITVOverview,
} from '@movie_trailer/core/types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

export type IDiscoverState = IPagination & {results: Array<IMediaOverview>};

export const initialState: IDiscoverState = {
  page: 0,
  total_pages: 0,
  total_results: 0,
  results: [],
};

const loadData = async (
  {
    type,
    params,
  }: {
    type: 'movie' | 'tv';
    params?: Record<string, string | number | undefined>;
  },
  {getState}: {getState: () => unknown},
) => {
  if (type === 'movie') {
    const data = await getMediaOverviewByDiscover<IMovieOverview>(
      'movie',
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
    const data = await getMediaOverviewByDiscover<ITVOverview>('tv', params);
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
};

export const loadInitial = createAsyncThunk('discover/loadInitial', loadData);

export const loadMore = createAsyncThunk('discover/loadMore', loadData);

const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(loadInitial.pending, () => {
      return initialState;
    });

    builder.addCase(loadInitial.fulfilled, (state, action) => {
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      state.total_results = action.payload.total_results;
      state.results = action.payload.results;
    });

    builder.addCase(loadMore.fulfilled, (state, action) => {
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      state.total_results = action.payload.total_results;
      state.results = [...state.results, ...action.payload.results];
    });
  },
});

export const {} = discoverSlice.actions;

export default discoverSlice.reducer;
