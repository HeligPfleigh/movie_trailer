import React from 'react';

import {
  AppBar,
  Box,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {ListMediaScreenProps} from './types';
import {useListMediaHeader} from './useListMediaHeader';

const ListMediaScreen: React.FC<ListMediaScreenProps> = ({
  navigation,
  route,
}: ListMediaScreenProps) => {
  const header = useListMediaHeader();
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  console.log(route.params);

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography variant="h4" color={colors.white} fontWeight="600">
          {header}
        </Typography>
      </Box>
    </Box>
  );
};

export default ListMediaScreen;
