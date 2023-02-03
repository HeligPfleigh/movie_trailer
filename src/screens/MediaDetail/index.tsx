import React, {useEffect, useRef} from 'react';
import InAppReview from 'react-native-in-app-review';
import dayjs from 'dayjs';
import Config from 'react-native-config';

import {AppBar, HomeBackground} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {MediaDetailRef, MediaDetailScreenProps} from './types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';

import {Linking, ScrollView, Share, StyleSheet} from 'react-native';

import MovieDetail from './MovieDetail';
import TVDetail from './TVDetail';
import {useInterstitialAd} from '@movie_trailer/components/ads/useInterstitialAd';

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

  const {isLoaded, load, show} = useInterstitialAd();

  const mediaDetailRef = useRef<MediaDetailRef>(null);

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handleShareMedia = () => {
    Share.share({
      message: `Check out this ${
        type === 'tv' ? 'show' : 'movie'
      } on TMDB: https://www.themoviedb.org/${type}/${id}`,
    });
  };

  const handleReportPolicyViolent = () => {
    // send mail to report this movie
    const subject = 'Report Policy Violent';

    const body = `Dear Developer,\nOn behalf of my company <company_name>\nPlease hidden this show from your app:\n${
      mediaDetailRef.current?.mediaName || ''
    }\nhttps://www.themoviedb.org/${type}/${id}\nBecause:\n\n<reason here>\n\n--------------------\nSystem version:\nModel name:\nApp version:`;

    Linking.openURL(
      `mailto:${Config.FEEDBACK_EMAIL}?subject=${subject}&body=${body}`,
    );
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
    load();
  }, [load]);

  useEffect(() => {
    if (isLoaded) {
      show();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const content =
    type === 'movie' ? (
      <MovieDetail ref={mediaDetailRef} />
    ) : (
      <TVDetail ref={mediaDetailRef} />
    );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollview}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar
        onSearch={handleOpenSearch}
        onShare={handleShareMedia}
        onReport={handleReportPolicyViolent}
      />

      {content}
    </ScrollView>
  );
};

export default MediaDetailScreen;
