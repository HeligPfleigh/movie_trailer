import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {Box, HomeBackground, Tabs, Typography} from '@movie_trailer/components';
import {fetchMovieGenres} from '@movie_trailer/store/slices/genreSlice';
import AppBar from './AppBar';
import SearchBox from './SearchBox';
import PopularGenres from './Sections/PopularGenres';
import Today from './Sections/Today';
import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
} from '@movie_trailer/store/slices/movieSlice';
import Upcoming from './Sections/Upcomming';
import {ScrollView} from 'react-native-gesture-handler';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ShowTime from './Sections/ShowTime';

const styles = StyleSheet.create({
  seeAllBtn: {
    width: responsiveSize(124),
    padding: spacing(0.5),
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: responsiveSize(8),
  },
});

function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieGenres());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(540)} />
      <AppBar />
      <Box flex={false} ml={2} mr={2} mt={2.5}>
        <Tabs tabs={['Movie', 'TV Show']} />
      </Box>

      <Box flex={false} ml={2} mr={2} mt={2.5} mb={4}>
        <SearchBox />
      </Box>

      <ScrollView>
        <Box flex={false} ml={2} mr={2} mb={4}>
          <PopularGenres />
        </Box>

        <Box flex={false} ml={2} mr={2} mb={4}>
          <Today />
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

        <Box flex={false} ml={2} mr={2} mb={3}>
          <ShowTime />
        </Box>
      </ScrollView>
    </Box>
  );
}

export default HomeScreen;
