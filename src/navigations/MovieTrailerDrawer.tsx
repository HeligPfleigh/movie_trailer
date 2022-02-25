import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {Box, Typography} from '@movie_trailer/components';
import CloseIcon from '@movie_trailer/assets/icons/CloseIcon';
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

  // const handlePressMovie = () => navigation.navigate(NavigatorMap.Home);
  const handleClose = () => navigation.closeDrawer();

  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <Box mt={7} mb={8.5} ml={1}>
        <TouchableOpacity onPress={handleClose}>
          <CloseIcon />
        </TouchableOpacity>
      </Box>
      <DrawerItem
        label={() => (
          <Typography variant="h4" color={colors.white} textAlign="center">
            {NavigatorMap.Movie}
          </Typography>
        )}
        onPress={() => {}}
        style={styles.drawerItem}
      />
      <DrawerItem
        label={() => (
          <Typography variant="h4" color={colors.white} textAlign="center">
            {NavigatorMap.TVShow}
          </Typography>
        )}
        onPress={() => {}}
        style={styles.drawerItem}
      />
      <DrawerItem
        label={() => (
          <Typography variant="h4" color={colors.white} textAlign="center">
            {NavigatorMap.Favorite}
          </Typography>
        )}
        onPress={() => {}}
        style={styles.drawerItem}
      />
      <DrawerItem
        label={() => (
          <Typography variant="h4" color={colors.white} textAlign="center">
            {NavigatorMap.Setting}
          </Typography>
        )}
        onPress={() => {}}
        style={styles.drawerItem}
      />
    </DrawerContentScrollView>
  );
};

export default MovieTrailerDrawer;
