import {AppBar, Box, HomeBackground} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

type FavoriteScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.Favorite>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

const FavoriteScreen: React.FC<FavoriteScreenNavigationProps> = ({
  navigation,
}: FavoriteScreenNavigationProps) => {
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />
    </Box>
  );
};

export default FavoriteScreen;
