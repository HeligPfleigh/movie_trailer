import React, {useEffect} from 'react';
import InAppReview from 'react-native-in-app-review';
import dayjs from 'dayjs';
import Config from 'react-native-config';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

import {AppBar, HomeBackground} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {MediaDetailScreenProps} from './types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';

import {ScrollView, Share, StyleSheet} from 'react-native';

import MovieDetail from './MovieDetail';
import TVDetail from './TVDetail';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.codGray,
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
});

// TODO: add real ad
const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
  keywords: ['fashion', 'clothing'],
});

const MediaDetailScreen: React.FC<MediaDetailScreenProps> = ({
  navigation,
  route,
}: MediaDetailScreenProps) => {
  const {type, id} = route.params;
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handleShareMedia = () => {
    Share.share({
      message: `Check out this ${
        type === 'tv' ? 'show' : 'movie'
      } on TMDB: https://www.themoviedb.org/${type}/${id}`,
    });
  };

  useEffect(() => {
    const requestInappReview = async () => {
      const now = dayjs();
      const isInAppReviewAvailable = InAppReview.isAvailable();

      // tricky to show in app review after specific date
      if (
        isInAppReviewAvailable &&
        now.isAfter(dayjs(Config.IN_APP_REVIEW_DISABLE_BEFORE_DAY))
      ) {
        try {
          await InAppReview.RequestInAppReview();
        } catch (error) {
          // TODO: handle error
        }
      }
    };

    setTimeout(() => {
      requestInappReview();
    }, 5000);
  }, []);

  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        interstitial.show();
      },
    );

    // Start loading the interstitial straight away
    interstitial.load();

    // Unsubscribe from events on unmount
    return unsubscribe;
  }, []);

  const content = type === 'movie' ? <MovieDetail /> : <TVDetail />;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollview}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} onShare={handleShareMedia} />

      {content}
    </ScrollView>
  );
};

export default MediaDetailScreen;
