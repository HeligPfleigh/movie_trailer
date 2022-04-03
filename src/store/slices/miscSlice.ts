import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IMiscState {
  url: string;
}

export const initialState: IMiscState = {
  url: '',
};

const miscSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    openVideo: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    closeVideo: state => {
      state.url = '';
    },
  },
});

export const {openVideo, closeVideo} = miscSlice.actions;

export default miscSlice.reducer;
