import React, {memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {Box, SectionB, Typography} from '@movie_trailer/components';
import PopularGenres from './Sections/PopularGenres';
import Today from './Sections/Today';
import Upcoming from './Sections/Upcoming';
import {RootState} from '@movie_trailer/store/rootReducer';
import {
  recommendationMoviesSelector,
  todayMoviesSelector,
} from '@movie_trailer/store/selectors/movie';
import {
  fetchNowPlayingMovies,
  fetchRecommendationMovies,
  fetchUpcomingMovies,
} from '@movie_trailer/store/slices/movieSlice';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigationProps} from './types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import SelfieWithMovie from './Sections/SelfieWithMovie';
import BasicNativeAdsView from '@movie_trailer/components/ads/BasicNativeAdsView';

const styles = StyleSheet.create({
  seeAllBtn: {
    width: responsiveSize(124),
    padding: spacing(0.5),
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: responsiveSize(8),
  },
});

const MovieTab = () => {
  const genres = useSelector((state: RootState) => state.genre.movieGenres);
  const moviesToday = useSelector(todayMoviesSelector);
  const recommendationMovies = useSelector(recommendationMoviesSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProps>();

  useEffect(() => {
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchRecommendationMovies());
  }, [dispatch]);

  const handleSeeAll = () => {
    navigation.push(NavigatorMap.ListMedia, {
      type: 'movie',
      title: 'Recommendation',
      url: 'movie/top_rated',
    });
  };

  const handleSeeAllUpcoming = () => {
    navigation.push(NavigatorMap.ListMedia, {
      type: 'movie',
      title: 'Upcoming',
      url: 'movie/upcoming',
    });
  };

  const handlePressMedia = (id: number) =>
    navigation.push(NavigatorMap.MediaDetail, {id, type: 'movie'});

  return (
    <>
      <Box flex={false} ml={2} mr={2} mb={4} mt={4}>
        <PopularGenres genres={genres} type="movie" />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={4}>
        <BasicNativeAdsView />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={4}>
        <Today medias={moviesToday} type="movie" />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={3}>
        <Upcoming />
      </Box>

      <Box flex={false} center mb={5}>
        <TouchableOpacity onPress={handleSeeAllUpcoming}>
          <Box flex={false} center style={styles.seeAllBtn}>
            <Typography variant="caps1" color={colors.white}>
              See All
            </Typography>
          </Box>
        </TouchableOpacity>
      </Box>

      <Box flex={false} ml={2} mr={2} mb={5}>
        <SelfieWithMovie />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={3}>
        <SectionB
          medias={recommendationMovies.slice(0, 3)}
          onSeeAll={handleSeeAll}
          onPressMedia={handlePressMedia}
        />
      </Box>
    </>
  );
};

export default memo(MovieTab);
