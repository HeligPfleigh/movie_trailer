import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import HeartIcon from '@movie_trailer/assets/icons/Heart';
import MenuIcon from '@movie_trailer/assets/icons/Menu';
import SettingIcon from '@movie_trailer/assets/icons/Setting';
import {Box} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {RootDrawerParamList} from '@movie_trailer/navigations/types';

type NavigationProps = DrawerNavigationProp<
  RootDrawerParamList,
  NavigatorMap.Home
>;

const AppBar: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();

  const handleOpenDrawer = () => navigation.openDrawer();

  return (
    <Box row mt={2.5} pl={2} pr={2} flex={false}>
      <Box>
        <TouchableOpacity onPress={handleOpenDrawer}>
          <MenuIcon />
        </TouchableOpacity>
      </Box>

      <Box flex={false} row>
        <Box flex={false} mr={2}>
          <TouchableOpacity>
            <HeartIcon />
          </TouchableOpacity>
        </Box>

        <TouchableOpacity>
          <SettingIcon />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default AppBar;
