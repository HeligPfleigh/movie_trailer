import React from 'react';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {ImageBackground, StyleSheet} from 'react-native';

import {Typography, Box} from '../common';
import StarIcon from '@movie_trailer/assets/icons/Star';
import {IMediaOverview} from '@movie_trailer/core/types';

const styles = StyleSheet.create({
  container: {
    width: responsiveSize(178),
    height: responsiveSize(248),
    paddingHorizontal: spacing(1.5),
    paddingVertical: spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: colors.black,
    top: spacing(1),
    left: spacing(1),
    paddingHorizontal: spacing(1),
    paddingVertical: spacing(0.5),
    borderRadius: responsiveSize(8),
    justifyContent: 'center',
  },
});

const MovieCard: React.FC<IMediaOverview> = ({
  title,
  genres,
  poster,
  rating,
}: IMediaOverview) => {
  return (
    <ImageBackground
      source={{uri: poster}}
      resizeMode="cover"
      style={styles.container}
      imageStyle={{borderRadius: responsiveSize(16)}}>
      <Box flex={false} style={styles.badge}>
        <StarIcon />
        <Box flex={false} ml={0.5}>
          <Typography variant="caps3" color={colors.white}>
            {rating}
          </Typography>
        </Box>
      </Box>
      <Typography variant="caps1" color={colors.zircon}>
        {title}
      </Typography>
      <Typography variant="caps2" color={colors.cadetBlue}>
        {genres}
      </Typography>
    </ImageBackground>
  );
};

export default MovieCard;
