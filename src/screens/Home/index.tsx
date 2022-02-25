import React from 'react';

import {colors} from '@movie_trailer/theme';
import {Box, HomeBackground} from '@movie_trailer/components';
import AppBar from './AppBar';

function HomeScreen() {
  return (
    <Box color={colors.codGray}>
      <HomeBackground />
      <AppBar />
    </Box>
  );
}

export default HomeScreen;
