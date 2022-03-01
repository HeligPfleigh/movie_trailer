import {getMediaOverview} from '@movie_trailer/core/apis';
import {IMovieOverview, IMediaPagination} from '@movie_trailer/core/types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export type IMovieState = Record<
  'nowPlaying' | 'upcoming' | 'recommendation',
  IMediaPagination & {results: Array<IMovieOverview>}
>;

const defaultPage: IMediaPagination & {results: Array<IMovieOverview>} = {
  dates: {
    maximum: '',
    minimum: '',
  },
  results: [],
  page: 1,
  total_pages: 1,
  total_results: 0,
};

export const initialState: IMovieState = {
  nowPlaying: defaultPage,
  upcoming: defaultPage,
  recommendation: defaultPage,
};

export const fetchNowPlayingMovies = createAsyncThunk(
  'movie/fetchNowPlayingMovies',
  async () => {
    const data = await getMediaOverview<IMovieOverview>('movie', 'now_playing');
    return data;
  },
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movie/fetchUpcomingMovies',
  async () => {
    const data = await getMediaOverview<IMovieOverview>('movie', 'upcoming');
    return data;
  },
);

export const fetchRecommendationMovies = createAsyncThunk(
  'movie/fetchRecommendationMovies',
  async () => {
    const data = await getMediaOverview<IMovieOverview>('movie', 'top_rated');
    return data;
  },
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
      state.nowPlaying = action.payload;
    });

    builder.addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
      state.upcoming = action.payload;
    });

    builder.addCase(fetchRecommendationMovies.fulfilled, (state, action) => {
      state.recommendation = action.payload;
    });
  },
});

export const {} = movieSlice.actions;

export default movieSlice.reducer;
