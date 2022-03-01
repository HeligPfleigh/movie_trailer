import React, {memo, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {Box, Typography} from '@movie_trailer/components';
import PopularGenres from './Sections/PopularGenres';
import Today from './Sections/Today';
import Upcoming from './Sections/Upcomming';
import ShowTime from './Sections/ShowTime';
import Recommendation from './Sections/Recommendation';
import {RootState} from '@movie_trailer/store/rootReducer';
import {
  recommendationMoviesSelector,
  todayMoviesSelector,
} from '@movie_trailer/store/selectors/movie';
import {fetchMovieGenres} from '@movie_trailer/store/slices/genreSlice';
import {
  fetchNowPlayingMovies,
  fetchRecommendationMovies,
  fetchUpcomingMovies,
} from '@movie_trailer/store/slices/movieSlice';

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

  useEffect(() => {
    dispatch(fetchMovieGenres());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchRecommendationMovies());
  }, [dispatch]);

  return (
    <>
      <Box flex={false} ml={2} mr={2} mb={4} mt={4}>
        <PopularGenres genres={genres} type="movie" />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={4}>
        <Today medias={moviesToday} type="movie" />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={3}>
        <Upcoming />
      </Box>

      <Box flex={false} center mb={5}>
        <TouchableOpacity>
          <Box flex={false} center style={styles.seeAllBtn}>
            <Typography variant="caps1" color={colors.white}>
              See All
            </Typography>
          </Box>
        </TouchableOpacity>
      </Box>

      <Box flex={false} ml={2} mr={2} mb={5}>
        <ShowTime />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={3}>
        <Recommendation medias={recommendationMovies} type="movie" />
      </Box>
    </>
  );
};

export default memo(MovieTab);
