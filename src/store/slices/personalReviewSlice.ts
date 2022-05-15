import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IPersonalReview {
  review: {
    title: string;
    note: string;
    images: Array<string>;
    reviewedDate: string;
    rating: number;
  };
  media: {
    id: number;
    type: 'movie' | 'tv';
    name: string;
    poster: string;
  };
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
    addReview: (state, action: PayloadAction<IPersonalReview>) => {
      state.reviews.unshift(action.payload);
    },
  },
});

export const {addReview} = personalReviewSlice.actions;

export default personalReviewSlice.reducer;
