import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {colors, responsiveSize} from '@movie_trailer/theme';
import {Box, HomeBackground, Tabs} from '@movie_trailer/components';
import {fetchMovieGenres} from '@movie_trailer/store/slices/genreSlice';
import AppBar from './AppBar';
import SearchBox from './SearchBox';
import {
  fetchNowPlayingMovies,
  fetchRecommendationMovies,
  fetchUpcomingMovies,
} from '@movie_trailer/store/slices/movieSlice';
import {StyleSheet, ScrollView} from 'react-native';
import MovieTab from './MovieTab';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.codGray,
  },
});

function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieGenres());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchRecommendationMovies());
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      <HomeBackground height={responsiveSize(540)} />
      <AppBar />
      <Box flex={false} ml={2} mr={2} mt={2.5}>
        <Tabs tabs={['Movie', 'TV Show']} />
      </Box>

      <Box flex={false} ml={2} mr={2} mt={2.5} mb={4}>
        <SearchBox />
      </Box>

      <MovieTab />
    </ScrollView>
  );
}

export default HomeScreen;
