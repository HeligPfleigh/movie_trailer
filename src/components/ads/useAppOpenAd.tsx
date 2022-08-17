import {RootState} from '@movie_trailer/store/rootReducer';
import {increaseOpenAdDisplayAmount} from '@movie_trailer/store/slices/adsSlice';
import {useEffect} from 'react';
import {useAppOpenAd as useAppOpenAdDefault} from 'react-native-google-mobile-ads';
import {useDispatch, useSelector} from 'react-redux';

import {adConfigs} from './config';

export const useAppOpenAd = () => {
  const {isLoaded, load, show} = useAppOpenAdDefault(adConfigs.openAdUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  const openAdRate = useSelector((state: RootState) => state.ads.openAdRate);
  const openAdDisplayAmount = useSelector(
    (state: RootState) => state.ads.openAdDisplayAmount,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    load();
  }, [load]);

  const handleShowOpenAd = () => {
    dispatch(increaseOpenAdDisplayAmount());
    if (!openAdRate || openAdDisplayAmount % openAdRate) {
      return;
    } else {
      show();
    }
  };

  useEffect(() => {
    if (isLoaded) {
      handleShowOpenAd();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);
};
