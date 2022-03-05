import React, {memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Box, SectionB} from '@movie_trailer/components';
import PopularGenres from './Sections/PopularGenres';
import Today from './Sections/Today';
import {RootState} from '@movie_trailer/store/rootReducer';
import {
  aringTodayTvShowsSelector,
  recommendationTvShowsSelector,
} from '@movie_trailer/store/selectors/tvShow';
import LatestShows from './Sections/LatestShows';
import {
  fetchAringTodayTVShows,
  fetchRecommendationTVShows,
} from '@movie_trailer/store/slices/tvShowSlice';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigationProps} from './types';
import {loadInitial} from '@movie_trailer/store/slices/mediaListSlice';

const TvShowTab = () => {
  const genres = useSelector((state: RootState) => state.genre.tvGenres);
  const airingTodayShows = useSelector(aringTodayTvShowsSelector);
  const recommendationShows = useSelector(recommendationTvShowsSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation<HomeNavigationProps>();

  useEffect(() => {
    dispatch(fetchAringTodayTVShows());
    dispatch(fetchRecommendationTVShows());
  }, [dispatch]);

  const handleSeeAll = () => {
    dispatch(loadInitial({url: 'tv/top_rated'}));

    navigation.push(NavigatorMap.ListMedia, {
      type: 'tv',
      title: 'Recommendation',
    });
  };

  const handlePressMedia = (id: number) =>
    navigation.navigate(NavigatorMap.MediaDetail, {id, type: 'tv'});

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
