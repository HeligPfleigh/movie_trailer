import {getPopularPeople, IMAGE_SERVER} from '@movie_trailer/core/apis';
import {IActorOverview, IPagination} from '@movie_trailer/core/types';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export type IPopularPeopleState = IPagination & {
  results: Array<IActorOverview>;
};

const loadData = async ({
  params,
}: {
  params?: Record<string, string | number | undefined>;
}) => {
  const data = await getPopularPeople(params);
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
};

export const loadInitial = createAsyncThunk(
  'popularPeople/loadInitial',
  loadData,
);

export const loadMore = createAsyncThunk('popularPeople/loadMore', loadData);

export const initialState: IPopularPeopleState = {
  page: 0,
  total_pages: 0,
  total_results: 0,
  results: [],
};

const popularPeopleSlice = createSlice({
  name: 'popularPeople',
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addCase(loadInitial.pending, () => {
      return initialState;
    });

    builder.addCase(loadInitial.fulfilled, (state, action) => {
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      state.total_results = action.payload.total_results;
      state.results = action.payload.results;
    });

    builder.addCase(loadMore.fulfilled, (state, action) => {
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      state.total_results = action.payload.total_results;
      state.results = [...state.results, ...action.payload.results];
    });
  },
});

export const {} = popularPeopleSlice.actions;

export default popularPeopleSlice.reducer;
