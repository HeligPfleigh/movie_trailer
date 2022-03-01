import {
  getSearchMovie,
  getSearchPeople,
  getSearchTV,
} from '@movie_trailer/core/apis';
import {
  IMovieOverview,
  IPagination,
  IPeopleOverview,
  ITVOverview,
} from '@movie_trailer/core/types';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ISearchState {
  activeSearchTab: 'tv' | 'movie' | 'person';
  tv: IPagination & {results: ITVOverview[]};
  movie: IPagination & {results: IMovieOverview[]};
  person: IPagination & {results: IPeopleOverview[]};
}

const defaultPage = {
  page: 0,
  total_pages: 0,
  total_results: 0,
  results: [],
};

const initialState: ISearchState = {
  activeSearchTab: 'movie',
  tv: defaultPage,
  movie: defaultPage,
  person: defaultPage,
};

export const requestSearchPeople = createAsyncThunk(
  'search/requestSearchPeople',
  async (search: string) => {
    const data = await getSearchPeople(search);
    return data;
  },
);

export const requestSearchTV = createAsyncThunk(
  'search/requestSearchTV',
  async (search: string) => {
    const data = await getSearchTV(search);
    return data;
  },
);

export const requestSearchMovie = createAsyncThunk(
  'search/requestSearchMovie',
  async (search: string) => {
    const data = await getSearchMovie(search);
    return data;
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setActiveSearchTab: (
      state,
      action: PayloadAction<'tv' | 'movie' | 'person'>,
    ) => {
      state.activeSearchTab = action.payload;
    },
  },
  extraReducers: (builder): void => {
    builder.addCase(requestSearchPeople.fulfilled, (state, action) => {
      state.person = action.payload;
    });

    builder.addCase(requestSearchMovie.fulfilled, (state, action) => {
      state.movie = action.payload;
    });

    builder.addCase(requestSearchTV.fulfilled, (state, action) => {
      state.tv = action.payload;
    });
  },
});

export const {setActiveSearchTab} = searchSlice.actions;

export default searchSlice.reducer;
