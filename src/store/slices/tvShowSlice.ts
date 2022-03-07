import {getHeroTVShow, getMediaOverview} from '@movie_trailer/core/apis';
import {
  IMediaPagination,
  ITVDetail,
  ITVOverview,
} from '@movie_trailer/core/types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export interface ITVShowState
  extends Record<
    'airingToday' | 'recommendation',
    IMediaPagination & {results: Array<ITVOverview>}
  > {
  latest?: ITVDetail;
}

const defaultPage: IMediaPagination & {results: Array<ITVOverview>} = {
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
    const data = await getMediaOverview<ITVOverview>('tv/airing_today');
    return data;
  },
);

export const fetchRecommendationTVShows = createAsyncThunk(
  'tvShow/fetchRecommendationTVShows',
  async () => {
    const data = await getMediaOverview<ITVOverview>('tv/top_rated');
    return data;
  },
);

export const fetchHeroTVShow = createAsyncThunk(
  'tvShow/fetchHeroTVShow',
  async ({id}: {id: number}) => {
    const data = await getHeroTVShow(id);
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

    builder.addCase(fetchHeroTVShow.fulfilled, (state, action) => {
      state.latest = action.payload;
    });
  },
});

export const {} = tvShowSlice.actions;

export default tvShowSlice.reducer;
