import React from 'react';

import {colors, responsiveSize} from '@movie_trailer/theme';
import {Box, HomeBackground} from '@movie_trailer/components';
import AppBar from './AppBar';

function HomeScreen() {
  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(540)} />
      <AppBar />
    </Box>
  );
}

export default HomeScreen;
