import React from 'react';
import NativeAdView, {
  AdBadge,
  AdvertiserView,
  CallToActionView,
  ImageView,
  StoreView,
  TaglineView,
} from 'react-native-admob-native-ads';
import {adConfigs} from './config';

const BasicNativeAdsView: React.FC = () => {
  const nativeAdViewRef = React.useRef<NativeAdView>(null);

  // TODO: ask permission on ios ??
  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <NativeAdView adUnitID={adConfigs.nativeAdUnitId} ref={nativeAdViewRef}>
      <AdBadge
        style={{
          width: 15,
          height: 15,
          borderWidth: 1,
          borderRadius: 2,
          borderColor: 'green',
        }}
        textStyle={{
          fontSize: 9,
          color: 'green',
        }}
      />
      <AdvertiserView
        style={{
          fontWeight: 'bold',
          fontSize: 10,
        }}
      />
      <TaglineView
        style={{
          fontWeight: 'bold',
          fontSize: 12,
        }}
      />
      <StoreView
        style={{
          fontWeight: 'bold',
          fontSize: 10,
        }}
      />
      <ImageView
        style={{
          width: '100%',
          height: 100,
        }}
      />

      <CallToActionView
        style={{
          height: 45,
          paddingHorizontal: 12,
          backgroundColor: 'purple',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          elevation: 10,
          width: '100%',
        }}
        textStyle={{color: 'white', fontSize: 14}}
      />
    </NativeAdView>
  );
};

export default BasicNativeAdsView;
