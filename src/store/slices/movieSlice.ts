import {getNowPlayingMovies} from '@movie_trailer/core/apis';
import {IMovieOverview} from '@movie_trailer/core/types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export interface IMovieState {
  nowPlaying: {
    movies: Array<IMovieOverview>;
  };
}

export const initialState: IMovieState = {
  nowPlaying: {
    movies: [],
  },
};

export const fetchNowPlayingMovies = createAsyncThunk(
  'movie/fetchNowPlayingMovies',
  async () => {
    const {results} = await getNowPlayingMovies();
    return results;
  },
);

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(fetchNowPlayingMovies.fulfilled, (state, action) => {
      state.nowPlaying.movies = action.payload;
    });
  },
});

export const {} = movieSlice.actions;

export default movieSlice.reducer;
