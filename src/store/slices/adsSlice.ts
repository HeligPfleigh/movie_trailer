import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface IAdsState {
  interstitialAdRate: number;
  openAdRate: number;
  interstitialAdDisplayAmount: number;
  openAdDisplayAmount: number;
}

export const initialState: IAdsState = {
  interstitialAdRate: 0,
  openAdRate: 0,
  interstitialAdDisplayAmount: 0,
  openAdDisplayAmount: 0,
};

const adsSlice = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    setAdRate: (
      state,
      action: PayloadAction<{interstitialAdRate: number; openAdRate: number}>,
    ) => {
      state.interstitialAdRate = action.payload.interstitialAdRate;
      state.openAdRate = action.payload.openAdRate;
    },
    increaseInterstitialAdDisplayAmount: state => {
      state.interstitialAdDisplayAmount += 1;
    },
    increaseOpenAdDisplayAmount: state => {
      state.openAdDisplayAmount += 1;
    },
  },
});

export const {
  setAdRate,
  increaseInterstitialAdDisplayAmount,
  increaseOpenAdDisplayAmount,
} = adsSlice.actions;

export default adsSlice.reducer;
