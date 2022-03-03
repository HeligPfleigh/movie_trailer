import React from 'react';

import {
  AppBar,
  Box,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {MediaDetailScreenProps} from './types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';

const MediaDetailScreen: React.FC<MediaDetailScreenProps> = ({
  navigation,
}: MediaDetailScreenProps) => {
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handleShareMedia = () => {
    // TODO
  };

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} onShare={handleShareMedia} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography variant="h4" color={colors.white} fontWeight="600">
          Detail
        </Typography>
      </Box>
    </Box>
  );
};

export default MediaDetailScreen;
