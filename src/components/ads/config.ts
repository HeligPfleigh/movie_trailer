import {TestIds} from 'react-native-google-mobile-ads';
import {TestIds as OtherTestIds} from 'react-native-admob-native-ads';
import {Platform} from 'react-native';

// TODO: replace with real ad id
export const adConfigs = {
  interstitialAdUnitId: __DEV__
    ? TestIds.INTERSTITIAL
    : Platform.select({
        ios: 'ca-app-pub-3548016532531500/7145906708',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
  openAdUnitId: __DEV__
    ? TestIds.APP_OPEN
    : Platform.select({
        ios: 'ca-app-pub-3548016532531500/2535194961',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
  nativeAdUnitId: __DEV__
    ? OtherTestIds.Image
    : Platform.select({
        ios: 'ca-app-pub-3548016532531500/6282868288',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
  bannerAdUnitId: __DEV__
    ? TestIds.BANNER
    : Platform.select({
        ios: 'ca-app-pub-3548016532531500/1605256671',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
  rewardedAdUnitId: __DEV__
    ? TestIds.REWARDED
    : Platform.select({
        ios: 'ca-app-pub-3548016532531500/2726766650',
        android: 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy',
      }) || '',
};
