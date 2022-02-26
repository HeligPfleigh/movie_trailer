import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {colors, responsiveSize} from '@movie_trailer/theme';
import {Box, HomeBackground, Tabs} from '@movie_trailer/components';
import {fetchMovieGenres} from '@movie_trailer/store/slices/genreSlice';
import AppBar from './AppBar';
import SearchBox from './SearchBox';
import PopularGenres from './Sections/PopularGenres';
import Today from './Sections/Today';
import {fetchNowPlayingMovies} from '@movie_trailer/store/slices/movieSlice';

function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieGenres());
    dispatch(fetchNowPlayingMovies());
  }, [dispatch]);

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(540)} />
      <AppBar />
      <Box flex={false} ml={2} mr={2} mt={2.5}>
        <Tabs tabs={['Movie', 'TV Show']} />
      </Box>

      <Box flex={false} ml={2} mr={2} mt={2.5}>
        <SearchBox />
      </Box>

      <Box flex={false} ml={2} mr={2} mt={4}>
        <PopularGenres />
      </Box>

      <Box flex={false} ml={2} mr={2} mt={4}>
        <Today />
      </Box>
    </Box>
  );
}

export default HomeScreen;
