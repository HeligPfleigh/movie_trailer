import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IPersonalReview {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  note: string;
  images: Array<string>;
  reviewedDate: string;
  rating: number;
}

export interface IPersonalReviewSlice {
  reviews: Array<IPersonalReview>;
}

export const initialState: IPersonalReviewSlice = {
  reviews: [],
};

const personalReviewSlice = createSlice({
  name: 'personalReview',
  initialState,
  reducers: {
    addReview: (
      state,
      action: PayloadAction<Omit<IPersonalReview, 'reviewedDate'>>,
    ) => {
      state.reviews.unshift({
        ...action.payload,
        reviewedDate: new Date().toISOString(),
      });
    },
  },
});

export const {addReview} = personalReviewSlice.actions;

export default personalReviewSlice.reducer;
