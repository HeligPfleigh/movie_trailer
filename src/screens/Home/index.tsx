import React from 'react';

import {colors, responsiveSize} from '@movie_trailer/theme';
import {Box, HomeBackground, Tabs} from '@movie_trailer/components';
import AppBar from './AppBar';

function HomeScreen() {
  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(540)} />
      <AppBar />
      <Box ml={2} mr={2} mt={2.5}>
        <Tabs tabs={['Movie', 'TV Show']} />
      </Box>
    </Box>
  );
}

export default HomeScreen;
