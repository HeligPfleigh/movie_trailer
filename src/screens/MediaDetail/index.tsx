import React from 'react';

import {AppBar, Box, HomeBackground} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {MediaDetailScreenProps} from './types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';

import {ScrollView, StyleSheet} from 'react-native';

import MovieDetail from './MovieDetail';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.codGray,
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
});

const MediaDetailScreen: React.FC<MediaDetailScreenProps> = ({
  navigation,
  route,
}: MediaDetailScreenProps) => {
  const {type} = route.params;
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handleShareMedia = () => {
    // TODO
  };

  const content = type === 'movie' ? <MovieDetail /> : <Box />;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollview}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} onShare={handleShareMedia} />

      {content}
    </ScrollView>
  );
};

export default MediaDetailScreen;
