import {getMediaOverview} from '@movie_trailer/core/apis';
import {
  IMediaOverview,
  IMediaPagination,
  IMovieOverview,
  IPagination,
  ITVOverview,
} from '@movie_trailer/core/types';
import {
  convertMovieOverviewToMediaOverview,
  convertTVOverviewToMediaOverview,
} from '@movie_trailer/core/utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

export type IMediaListState = {
  data: IPagination & {results: Array<IMediaOverview>};
  requestURL: string;
  loading: boolean;
};

export const initialState: IMediaListState = {
  data: {
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  },
  requestURL: '',
  loading: false,
};

const isTV = (
  data: IMediaPagination & {
    results: (IMovieOverview | ITVOverview)[];
  },
): data is IMediaPagination & {results: ITVOverview[]} =>
  data.results?.[0]?.first_air_date !== undefined;

export const loadInitial = createAsyncThunk(
  'mediaList/loadInitial',
  async ({url}: {url: string}, {getState}) => {
    const genres = (getState() as RootState).genre.movieGenres;

    const data = await getMediaOverview(url);

    let medias: Array<IMediaOverview> = [];

    if (isTV(data)) {
      medias = data.results.map(show =>
        convertTVOverviewToMediaOverview(show, genres),
      );
    } else {
      medias = data.results.map(movie =>
        convertMovieOverviewToMediaOverview(movie as IMovieOverview, genres),
      );
    }

    return {
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: medias,
    };
  },
);

export const loadMore = createAsyncThunk(
  'mediaList/loadMore',
  async (_, {getState}) => {
    const genres = (getState() as RootState).genre.movieGenres;
    const url = (getState() as RootState).mediaList.requestURL;
    const currentPage = (getState() as RootState).mediaList.data.page;
    const totalPage = (getState() as RootState).mediaList.data.total_pages;

    if (currentPage >= totalPage || totalPage === 0) {
      throw new Error('cannot load more');
    }

    const data = await getMediaOverview(url, {page: currentPage + 1});

    let medias: Array<IMediaOverview> = [];

    if (isTV(data)) {
      medias = data.results.map(show =>
        convertTVOverviewToMediaOverview(show, genres),
      );
    } else {
      medias = data.results.map(movie =>
        convertMovieOverviewToMediaOverview(movie as IMovieOverview, genres),
      );
    }

    return {
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: medias,
    };
  },
);

const mediaListSlice = createSlice({
  name: 'mediaList',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(loadInitial.pending, () => {
      return {
        ...initialState,
        loading: true,
      };
    });

    builder.addCase(loadInitial.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.requestURL = action.meta.arg.url;
    });

    builder.addCase(loadMore.pending, state => {
      state.loading = true;
    });

    builder.addCase(loadMore.fulfilled, (state, action) => {
      state.data.results = [...state.data.results, ...action.payload.results];
      state.data.page = action.payload.page;
      state.loading = false;
    });

    builder.addCase(loadMore.rejected, state => {
      state.loading = false;
    });
  },
});

export const {} = mediaListSlice.actions;

export default mediaListSlice.reducer;
