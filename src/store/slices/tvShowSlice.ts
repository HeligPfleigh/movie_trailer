import {
  getAringTodayTVShows,
  getRecommendationTVShows,
} from '@movie_trailer/core/apis';
import {IPagination, ITVShowOverview} from '@movie_trailer/core/types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export type ITVShowState = Record<
  'airingToday' | 'recommendation',
  IPagination & {results: Array<ITVShowOverview>}
>;

const defaultPage: IPagination & {results: Array<ITVShowOverview>} = {
  dates: {
    maximum: '',
    minimum: '',
  },
  results: [],
  page: 1,
  total_pages: 1,
  total_results: 0,
};

export const initialState: ITVShowState = {
  airingToday: defaultPage,
  recommendation: defaultPage,
};

export const fetchAringTodayTVShows = createAsyncThunk(
  'tvShow/fetchAringTodayTVShows',
  async () => {
    const data = await getAringTodayTVShows();
    return data;
  },
);

export const fetchRecommendationTVShows = createAsyncThunk(
  'tvShow/fetchRecommendationTVShows',
  async () => {
    const data = await getRecommendationTVShows();
    return data;
  },
);

const tvShowSlice = createSlice({
  name: 'tvShow',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(fetchAringTodayTVShows.fulfilled, (state, action) => {
      state.airingToday = action.payload;
    });

    builder.addCase(fetchRecommendationTVShows.fulfilled, (state, action) => {
      state.recommendation = action.payload;
    });
  },
});

export const {} = tvShowSlice.actions;

export default tvShowSlice.reducer;
