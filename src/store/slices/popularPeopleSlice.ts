import {getPopularPeople, IMAGE_SERVER} from '@movie_trailer/core/apis';
import {IActorOverview, IPagination} from '@movie_trailer/core/types';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../rootReducer';

export type IPopularPeopleState = {
  data: IPagination & {results: Array<IActorOverview>};
  loading: boolean;
};

export const loadInitial = createAsyncThunk(
  'popularPeople/loadInitial',
  async () => {
    const data = await getPopularPeople();
    const actors = data.results.map(actor => {
      return {
        id: actor.id,
        name: actor.name,
        thumbnail: `${IMAGE_SERVER}${actor.profile_path}`,
        department: actor.known_for_department,
      };
    });

    return {
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: actors,
    };
  },
);

export const loadMore = createAsyncThunk(
  'popularPeople/loadMore',
  async (_, {getState}) => {
    const currentPage = (getState() as RootState).popularPeople.data.page;
    const totalPage = (getState() as RootState).popularPeople.data.total_pages;

    if (currentPage >= totalPage || totalPage === 0) {
      throw new Error('cannot load more');
    }
    const data = await getPopularPeople({page: currentPage + 1});
    const actors = data.results.map(actor => {
      return {
        id: actor.id,
        name: actor.name,
        thumbnail: `${IMAGE_SERVER}${actor.profile_path}`,
        department: actor.known_for_department,
      };
    });

    return {
      page: data.page,
      total_pages: data.total_pages,
      total_results: data.total_results,
      results: actors,
    };
  },
);

export const initialState: IPopularPeopleState = {
  data: {
    page: 0,
    total_pages: 0,
    total_results: 0,
    results: [],
  },
  loading: false,
};

const popularPeopleSlice = createSlice({
  name: 'popularPeople',
  initialState,
  reducers: {
    loadCredits: (state, action: PayloadAction<Array<IActorOverview>>) => {
      state.data.page = 1;
      state.data.results = action.payload;
      state.data.total_pages = 1;
      state.data.total_results = action.payload.length;
    },
  },
  extraReducers: (builder): void => {
    builder.addCase(loadInitial.pending, () => {
      return {...initialState, loading: true};
    });

    builder.addCase(loadInitial.fulfilled, (state, action) => {
      state.data = action.payload;
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

export const {loadCredits} = popularPeopleSlice.actions;

export default popularPeopleSlice.reducer;
