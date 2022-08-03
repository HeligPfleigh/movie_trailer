import React, {useEffect} from 'react';
import InAppReview from 'react-native-in-app-review';
import dayjs from 'dayjs';
import Config from 'react-native-config';

import {AppBar, HomeBackground} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {MediaDetailScreenProps} from './types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';

import {ScrollView, Share, StyleSheet} from 'react-native';

import MovieDetail from './MovieDetail';
import TVDetail from './TVDetail';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import {adConfigs} from '@movie_trailer/components/ads/config';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.codGray,
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
});

const MediaDetailScreen: React.FC<MediaDetailScreenProps> = ({
  navigation,
  route,
}: MediaDetailScreenProps) => {
  const {type, id} = route.params;

  const {isLoaded, load, show} = useInterstitialAd(
    adConfigs.interstitialAdUnitId,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

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
    // Start loading the interstitial straight away
    load();
  }, [load]);

  useEffect(() => {
    if (isLoaded) {
      show();
    }
  }, [isLoaded, show]);

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
