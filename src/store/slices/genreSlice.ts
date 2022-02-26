import {getListMovieGenres} from '@movie_trailer/core/apis';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export interface IGenreState {
  tvGenres: string[];
  movieGenres: string[];
}

export const initialState: IGenreState = {
  tvGenres: [],
  movieGenres: [],
};

export const fetchMovieGenres = createAsyncThunk(
  'genre/fetchMovieGenres',
  async () => {
    const {genres} = await getListMovieGenres();
    return genres;
  },
);

const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(fetchMovieGenres.fulfilled, (state, action) => {
      state.movieGenres = action.payload.map(item => item.name);
    });
  },
});

export const {} = genreSlice.actions;

export default genreSlice.reducer;
