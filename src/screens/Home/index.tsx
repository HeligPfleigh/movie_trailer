import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {colors, responsiveSize} from '@movie_trailer/theme';
import {Box, HomeBackground, Tabs} from '@movie_trailer/components';
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

        <Box flex={false} ml={2} mr={2} mb={4}>
          <Upcoming />
        </Box>
      </ScrollView>
    </Box>
  );
}

export default HomeScreen;
