import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {colors, responsiveSize} from '@movie_trailer/theme';
import {Box, HomeBackground, Tabs} from '@movie_trailer/components';
import {
  fetchMovieGenres,
  fetchTVShowGenres,
} from '@movie_trailer/store/slices/genreSlice';
import AppBar from './AppBar';
import SearchBox from './SearchBox';
import {
  fetchNowPlayingMovies,
  fetchRecommendationMovies,
  fetchUpcomingMovies,
} from '@movie_trailer/store/slices/movieSlice';
import {StyleSheet, ScrollView} from 'react-native';
import MovieTab from './MovieTab';
import TvShowTab from './TVShowTab';
import {
  fetchAringTodayTVShows,
  fetchRecommendationTVShows,
} from '@movie_trailer/store/slices/tvShowSlice';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.codGray,
  },
});

function HomeScreen() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<string>('Movie');

  useEffect(() => {
    dispatch(fetchMovieGenres());
    dispatch(fetchNowPlayingMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchRecommendationMovies());

    dispatch(fetchTVShowGenres());
    dispatch(fetchAringTodayTVShows());
    dispatch(fetchRecommendationTVShows());
  }, [dispatch]);

  const content = activeTab === 'TV Show' ? <TvShowTab /> : <MovieTab />;

  return (
    <ScrollView style={styles.container}>
      <HomeBackground height={responsiveSize(540)} />
      <AppBar />
      <Box flex={false} ml={2} mr={2} mt={2.5}>
        <Tabs
          tabs={['Movie', 'TV Show']}
          onTabChanged={setActiveTab}
          activeTab={activeTab}
        />
      </Box>

      <Box flex={false} ml={2} mr={2} mt={2.5}>
        <SearchBox />
      </Box>

      {content}
    </ScrollView>
  );
}

export default HomeScreen;
