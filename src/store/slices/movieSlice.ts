import {
  getNowPlayingMovies,
  getRecommendationMovies,
  getUpcomingMovies,
} from '@movie_trailer/core/apis';
import {IMovieOverview, IPagination} from '@movie_trailer/core/types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export interface IMovieState {
  nowPlaying: IPagination & {results: Array<IMovieOverview>};
  upcoming: IPagination & {results: Array<IMovieOverview>};
  recommandation: IPagination & {results: Array<IMovieOverview>};
}

const defaultPage: IPagination & {results: Array<IMovieOverview>} = {
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
  recommandation: defaultPage,
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

export const fetchRecommendationMovies = createAsyncThunk(
  'movie/fetchRecommendationMovies',
  async () => {
    const data = await getRecommendationMovies();
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
      state.recommandation = action.payload;
    });
  },
});

export const {} = movieSlice.actions;

export default movieSlice.reducer;
