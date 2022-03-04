import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import HeartIcon from '@movie_trailer/assets/icons/Heart';
import MenuIcon from '@movie_trailer/assets/icons/Menu';
import SettingIcon from '@movie_trailer/assets/icons/Setting';
import {Box} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {HomeNavigationProps} from './types';

const AppBar: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProps>();

  const handleOpenDrawer = () => navigation.openDrawer();
  const handleOpenSetting = () => navigation.navigate(NavigatorMap.Setting);
  const handleOpenFavorite = () => navigation.navigate(NavigatorMap.Favorite);

  return (
    <Box row mt={2.5} pl={2} pr={2} flex={false}>
      <Box flex={false}>
        <TouchableOpacity onPress={handleOpenDrawer}>
          <MenuIcon />
        </TouchableOpacity>
      </Box>

      <Box />

      <Box flex={false} row>
        <Box flex={false} mr={2}>
          <TouchableOpacity onPress={handleOpenFavorite}>
            <HeartIcon />
          </TouchableOpacity>
        </Box>

        <TouchableOpacity onPress={handleOpenSetting}>
          <SettingIcon />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default AppBar;
