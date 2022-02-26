import React from 'react';

import {colors, responsiveSize} from '@movie_trailer/theme';
import {Box, HomeBackground, Tabs} from '@movie_trailer/components';
import AppBar from './AppBar';
import SearchBox from './SearchBox';
import SectionHeader from './SectionHeader';

function HomeScreen() {
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
        <SectionHeader />
      </Box>
    </Box>
  );
}

export default HomeScreen;
