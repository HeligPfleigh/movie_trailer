import {Box, HomeBackground} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import CloseIcon from '@movie_trailer/assets/icons/Close';
import {RootDrawerParamList} from '@movie_trailer/navigations/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {DrawerScreenProps} from '@react-navigation/drawer';

type SearchScreenNavigationProps = DrawerScreenProps<
  RootDrawerParamList,
  NavigatorMap.Search
>;

const SearchScreen: React.FC<SearchScreenNavigationProps> = ({
  navigation,
}: SearchScreenNavigationProps) => {
  const handleBack = () => navigation.goBack();
  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />

      <Box row mt={2.5} pl={2} pr={2} flex={false}>
        <TouchableOpacity onPress={handleBack}>
          <CloseIcon />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default SearchScreen;
