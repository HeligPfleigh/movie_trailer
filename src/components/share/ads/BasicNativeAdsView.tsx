import React from 'react';
import NativeAdView, {
  AdBadge,
  AdvertiserView,
  StoreView,
  TaglineView,
} from 'react-native-admob-native-ads';

const BasicNativeAdsView: React.FC = () => {
  const nativeAdViewRef = React.useRef<NativeAdView>(null);

  // TODO: ask permission on ios ??
  React.useEffect(() => {
    nativeAdViewRef.current?.loadAd();
  }, []);

  return (
    <NativeAdView
      adUnitID="ca-app-pub-3940256099942544/2247696110"
      ref={nativeAdViewRef}>
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
    </NativeAdView>
  );
};

export default BasicNativeAdsView;
