import React from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';

import {
  AppBar,
  Box,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {CompositeScreenProps} from '@react-navigation/native';

type ListMediaScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.ListMedia>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

const ListMediaScreen: React.FC<ListMediaScreenNavigationProps> = ({
  navigation,
  route,
}: ListMediaScreenNavigationProps) => {
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  console.log(route.params);

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography variant="h4" color={colors.white} fontWeight="600">
          List Media
        </Typography>
      </Box>
    </Box>
  );
};

export default ListMediaScreen;
