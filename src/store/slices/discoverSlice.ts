import {getMediaOverviewByDiscover} from '@movie_trailer/core/apis';
import {
  IMediaOverview,
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

type SortByType =
  | 'vote_average.desc'
  | 'title.desc'
  | 'name.desc'
  | 'title.asc'
  | 'name.asc';

export type IDiscoverState = {
  data: IPagination & {results: Array<IMediaOverview>};
  loading: boolean;
  type: 'tv' | 'movie';
  sortBy: SortByType;
  genre?: number;
};

export const initialState: IDiscoverState = {
  data: {page: 0, total_pages: 0, total_results: 0, results: []},
  loading: false,
  type: 'movie',
  sortBy: 'vote_average.desc',
};

const isTV = (
  data: Array<IMovieOverview | ITVOverview>,
): data is ITVOverview[] => data?.[0]?.first_air_date !== undefined;

export const loadInitial = createAsyncThunk(
  'discover/loadInitial',
  async (
    {
      type,
      sortBy,
      genre,
    }: {type: 'tv' | 'movie'; sortBy: SortByType; genre?: number},
    {getState},
  ) => {
    const data = await getMediaOverviewByDiscover(type, {
      sort_by: sortBy,
      with_genres: genre,
    });

    let medias: Array<IMediaOverview> = [];

    if (isTV(data.results)) {
      const genres = (getState() as RootState).genre.tvGenres;
      medias = data.results.map(show =>
        convertTVOverviewToMediaOverview(show, genres),
      );
    } else {
      const genres = (getState() as RootState).genre.movieGenres;
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
  'discover/loadMore',
  async (_, {getState}) => {
    const type = (getState() as RootState).discover.type;
    const currentPage = (getState() as RootState).discover.data.page;
    const totalPage = (getState() as RootState).discover.data.total_pages;
    const filter = (getState() as RootState).discover.sortBy;
    const genre = (getState() as RootState).discover.genre;

    if (currentPage >= totalPage || totalPage === 0) {
      throw new Error('cannot load more');
    }

    const data = await getMediaOverviewByDiscover(type, {
      page: currentPage + 1,
      sort_by: filter,
      with_genres: genre,
    });

    let medias: Array<IMediaOverview> = [];

    if (isTV(data.results)) {
      const genres = (getState() as RootState).genre.tvGenres;
      medias = data.results.map(show =>
        convertTVOverviewToMediaOverview(show, genres),
      );
    } else {
      const genres = (getState() as RootState).genre.movieGenres;
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

const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(loadInitial.pending, (_, action) => {
      return {
        ...initialState,
        loading: true,
        sortBy: action.meta.arg.sortBy,
        genre: action.meta.arg.genre,
        type: action.meta.arg.type,
      };
    });

    builder.addCase(loadInitial.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(loadInitial.rejected, state => {
      state.loading = false;
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

export const {} = discoverSlice.actions;

export default discoverSlice.reducer;
