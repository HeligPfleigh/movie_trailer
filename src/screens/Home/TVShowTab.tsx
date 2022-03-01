import React, {memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Box} from '@movie_trailer/components';
import PopularGenres from './Sections/PopularGenres';
import Today from './Sections/Today';
import Recommendation from './Sections/Recommendation';
import {RootState} from '@movie_trailer/store/rootReducer';
import {
  aringTodayTvShowsSelector,
  recommendationTvShowsSelector,
} from '@movie_trailer/store/selectors/tvShow';
import LatestShows from './Sections/LatestShows';
import {fetchTVShowGenres} from '@movie_trailer/store/slices/genreSlice';
import {
  fetchAringTodayTVShows,
  fetchRecommendationTVShows,
} from '@movie_trailer/store/slices/tvShowSlice';

const TvShowTab = () => {
  const genres = useSelector((state: RootState) => state.genre.tvGenres);
  const airingTodayShows = useSelector(aringTodayTvShowsSelector);
  const recommendationShows = useSelector(recommendationTvShowsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTVShowGenres());
    dispatch(fetchAringTodayTVShows());
    dispatch(fetchRecommendationTVShows());
  }, [dispatch]);

  return (
    <>
      <Box flex={false} mb={4} mt={2}>
        <LatestShows medias={airingTodayShows} />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={4}>
        <Today medias={airingTodayShows} type="tv" />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={4}>
        <PopularGenres genres={genres} type="tv" />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={3}>
        <Recommendation medias={recommendationShows} type="tv" />
      </Box>
    </>
  );
};

export default memo(TvShowTab);
