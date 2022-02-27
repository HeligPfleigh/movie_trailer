import React, {memo} from 'react';
import {useSelector} from 'react-redux';

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

const TvShowTab = () => {
  const genres = useSelector((state: RootState) => state.genre.tvGenres);
  const airingTodayShows = useSelector(aringTodayTvShowsSelector);
  const recommendationShows = useSelector(recommendationTvShowsSelector);

  return (
    <>
      <Box flex={false} mb={4} mt={2}>
        <LatestShows medias={airingTodayShows} />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={4}>
        <Today medias={airingTodayShows} />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={4}>
        <PopularGenres genres={genres} />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={3}>
        <Recommendation medias={recommendationShows} />
      </Box>
    </>
  );
};

export default memo(TvShowTab);
