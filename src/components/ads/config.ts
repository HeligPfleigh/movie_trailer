import {TestIds} from 'react-native-google-mobile-ads';
import {TestIds as OtherTestIds} from 'react-native-admob-native-ads';
import {Platform} from 'react-native';

// TODO: replace with real ad id
export const adConfigs = {
  interstitialAdUnitId: __DEV__
    ? TestIds.INTERSTITIAL
    : Platform.select({
        ios: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
  openAdUnitId: __DEV__
    ? TestIds.APP_OPEN
    : Platform.select({
        ios: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
  nativeAdUnitId: __DEV__
    ? OtherTestIds.Image
    : Platform.select({
        ios: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
};

export const interstitialAdRate = 0.2; // posibility to display interstitial ads
