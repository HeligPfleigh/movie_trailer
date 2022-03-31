import React, {memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Box, SectionB} from '@movie_trailer/components';
import PopularGenres from './Sections/PopularGenres';
import Today from './Sections/Today';
import {AppDispatch, RootState} from '@movie_trailer/store/rootReducer';
import {
  aringTodayTvShowsSelector,
  recommendationTvShowsSelector,
} from '@movie_trailer/store/selectors/tvShow';
import LatestShows from './Sections/LatestShows';
import {
  fetchAringTodayTVShows,
  fetchHeroTVShow,
  fetchRecommendationTVShows,
} from '@movie_trailer/store/slices/tvShowSlice';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigationProps} from './types';
import {unwrapResult} from '@reduxjs/toolkit';

const TvShowTab = () => {
  const genres = useSelector((state: RootState) => state.genre.tvGenres);
  const airingTodayShows = useSelector(aringTodayTvShowsSelector);
  const recommendationShows = useSelector(recommendationTvShowsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<HomeNavigationProps>();

  useEffect(() => {
    dispatch(fetchAringTodayTVShows());

    dispatch(fetchRecommendationTVShows())
      .then(unwrapResult)
      .then(data => {
        const heroId = data.results?.[0]?.id;

        dispatch(fetchHeroTVShow({id: heroId}));
      });
  }, [dispatch]);

  const handleSeeAll = () => {
    navigation.push(NavigatorMap.ListMedia, {
      type: 'tv',
      title: 'Recommendation',
      url: 'tv/top_rated',
    });
  };

  const handlePressMedia = (id: number) =>
    navigation.push(NavigatorMap.MediaDetail, {id, type: 'tv'});

  return (
    <>
      <Box flex={false} mb={4} mt={2}>
        <LatestShows />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={4}>
        <Today medias={airingTodayShows} type="tv" />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={4}>
        <PopularGenres genres={genres} type="tv" />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={3}>
        <SectionB
          medias={recommendationShows.slice(0, 3)}
          onSeeAll={handleSeeAll}
          onPressMedia={handlePressMedia}
        />
      </Box>
    </>
  );
};

export default memo(TvShowTab);
