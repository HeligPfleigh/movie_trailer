import {getNowPlayingMovies, getUpcomingMovies} from '@movie_trailer/core/apis';
import {IMovieOverview, IPagination} from '@movie_trailer/core/types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export interface IMovieState {
  nowPlaying: IPagination & {results: Array<IMovieOverview>};
  upcoming: IPagination & {results: Array<IMovieOverview>};
}

const defaultPage: IPagination = {
  dates: {
    maximum: '',
    minimum: '',
  },
  page: 1,
  total_pages: 1,
  total_results: 0,
};

export const initialState: IMovieState = {
  nowPlaying: {
    ...defaultPage,
    results: [],
  },
  upcoming: {
    ...defaultPage,
    results: [],
  },
};

export const fetchNowPlayingMovies = createAsyncThunk(
  'movie/fetchNowPlayingMovies',
  async () => {
    const data = await getNowPlayingMovies();
    return data;
  },
);

export const fetchUpcomingMovies = createAsyncThunk(
  'movie/fetchUpcomingMovies',
  async () => {
    const data = await getUpcomingMovies();
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
  },
});

export const {} = movieSlice.actions;

export default movieSlice.reducer;
