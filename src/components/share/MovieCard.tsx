import React from 'react';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {ImageBackground, StyleSheet} from 'react-native';

import {Typography} from '../common';

const styles = StyleSheet.create({
  container: {
    width: responsiveSize(178),
    height: responsiveSize(248),
    paddingHorizontal: spacing(1.5),
    paddingVertical: spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

const MovieCard: React.FC = () => {
  return (
    <ImageBackground
      source={{uri: 'https://picsum.photos/200/300'}}
      resizeMode="cover"
      style={styles.container}
      imageStyle={{borderRadius: responsiveSize(16)}}>
      <Typography variant="caps1" color={colors.zircon}>
        Cinderella
      </Typography>
      <Typography variant="caps2" color={colors.cadetBlue}>
        Action/ Adventure
      </Typography>
    </ImageBackground>
  );
};

export default MovieCard;
