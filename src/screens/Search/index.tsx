import {Box, HomeBackground, Typography} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import React from 'react';

const SearchScreen: React.FC = () => {
  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <Typography>SearchSreen</Typography>
    </Box>
  );
};

export default SearchScreen;
