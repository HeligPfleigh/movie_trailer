import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

import {colors} from '@movie_trailer/theme';
import {Box} from '@movie_trailer/components';
import CloseIcon from '@movie_trailer/assets/icons/CloseIcon';

function MovieTrailerDrawer(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: colors.riverBed}}>
      <Box>
        <CloseIcon />
      </Box>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => {}} />
    </DrawerContentScrollView>
  );
}

export default MovieTrailerDrawer;
