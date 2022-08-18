import {RootState} from '@movie_trailer/store/rootReducer';
import {increaseInterstitialAdDisplayAmount} from '@movie_trailer/store/slices/adsSlice';
import dayjs from 'dayjs';
import Config from 'react-native-config';
import {
  AdHookReturns,
  useInterstitialAd as useInterstitialAdDefault,
} from 'react-native-google-mobile-ads';
import {useDispatch, useSelector} from 'react-redux';
import {adConfigs} from './config';

export const useInterstitialAd = (): Omit<
  AdHookReturns,
  'reward' | 'isEarnedReward'
> => {
  const data = useInterstitialAdDefault(adConfigs.interstitialAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const interstitialAdRate = useSelector(
    (state: RootState) => state.ads.interstitialAdRate,
  );
  const interstitialAdDisplayAmount = useSelector(
    (state: RootState) => state.ads.interstitialAdDisplayAmount,
  );

  const dispatch = useDispatch();

  const show = () => {
    dispatch(increaseInterstitialAdDisplayAmount());
    if (
      !interstitialAdRate ||
      interstitialAdDisplayAmount % interstitialAdRate ||
      !dayjs().isAfter(dayjs(Config.IN_APP_REVIEW_DISABLE_BEFORE_DAY))
    ) {
      return;
    } else {
      data.show();
    }
  };

  return {
    ...data,
    show,
  };
};
