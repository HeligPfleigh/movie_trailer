import {AppBar, Box, HomeBackground} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import React from 'react';

const SeasonDetailScreen: React.FC = () => {
  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar />
    </Box>
  );
};

export default SeasonDetailScreen;
