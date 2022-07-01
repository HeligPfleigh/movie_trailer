import {ISelfieFrameType} from '@movie_trailer/core/constants';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ISelfieState {
  recentSelfieTypes: Array<ISelfieFrameType>;
}

export const initialState: ISelfieState = {
  recentSelfieTypes: [],
};

const selfieSlice = createSlice({
  name: 'selfie',
  initialState,
  reducers: {
    addRecentSelfieType: (state, action: PayloadAction<ISelfieFrameType>) => {
      const list = Array.from(
        new Set([...state.recentSelfieTypes, action.payload]),
      );
      state.recentSelfieTypes = list.slice(0, 4);
    },
  },
});

export const {addRecentSelfieType} = selfieSlice.actions;

export default selfieSlice.reducer;
