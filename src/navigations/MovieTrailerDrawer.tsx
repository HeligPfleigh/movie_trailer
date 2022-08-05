import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {Box, Typography} from '@movie_trailer/components';
import CloseIcon from '@movie_trailer/assets/icons/Close';
import NavigatorMap from './NavigatorMap';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.riverBed,
    padding: spacing(1),
  },
  drawerItem: {
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    fontSize: responsiveSize(24),
    display: 'flex',
    justifyContent: 'center',
    color: colors.white,
  },
});

const MovieTrailerDrawer: React.FC<DrawerContentComponentProps> = (
  props: DrawerContentComponentProps,
) => {
  const {navigation} = props;

  const handleClose = () => navigation.closeDrawer();

  const items = [
    {
      title: 'Movie',
      onPress: () =>
        navigation.navigate(NavigatorMap.Overview, {type: 'movie'}),
    },
    {
      title: 'TV Show',
      onPress: () => navigation.navigate(NavigatorMap.Overview, {type: 'tv'}),
    },
    {
      title: 'Favorite',
      onPress: () => navigation.navigate(NavigatorMap.Favorite),
    },
    {
      title: 'Your Note',
      onPress: () => navigation.navigate(NavigatorMap.YourNoteNavigator),
    },
    {
      title: 'Setting',
      onPress: () => navigation.navigate(NavigatorMap.SettingNavigator),
    },
  ];

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <Box mt={1.5} mb={8.5} ml={1}>
        <TouchableOpacity onPress={handleClose}>
          <CloseIcon />
        </TouchableOpacity>
      </Box>
      {items.map(item => (
        <DrawerItem
          key={item.title}
          label={() => (
            <Typography variant="h4" color={colors.white} textAlign="center">
              {item.title}
            </Typography>
          )}
          onPress={item.onPress}
          style={styles.drawerItem}
        />
      ))}
    </DrawerContentScrollView>
  );
};

export default MovieTrailerDrawer;
