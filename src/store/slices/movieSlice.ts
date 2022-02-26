import {createSlice} from '@reduxjs/toolkit';

export interface IMovieState {}

export const initialState: IMovieState = {};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (): void => {},
});

export const {} = movieSlice.actions;

export default movieSlice.reducer;
