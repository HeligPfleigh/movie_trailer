import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

import {Box, Typography} from '@movie_trailer/components';
import {IFrameComponentProps} from '../../types';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import {
  MarshmallowBg,
  MarshmallowLargeFrame,
  MarshmallowSmallFrame,
} from '@movie_trailer/assets/pngs';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  largeFrame: {
    position: 'absolute',
    width: '100%',
    height: '120%',
  },
  cameraContainer: {
    width: '100%',
    height: responsiveSize(300),
    borderRadius: 20,
  },
  smallFrame: {
    width: responsiveSize(204),
    height: responsiveSize(286),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  poster: {
    width: responsiveSize(96),
    height: responsiveSize(134),
    position: 'absolute',
    bottom: responsiveSize(78),
    right: 0,
    transform: [{rotate: '-19deg'}],
  },
  infoContainer: {
    position: 'absolute',
    left: responsiveSize(8),
    bottom: responsiveSize(20),
    width: '66%',
  },
  timeContainer: {
    padding: spacing(1),
    marginTop: spacing(1),
    backgroundColor: '#D9D9D9',
    borderColor: colors.black,
    borderRadius: responsiveSize(2),
    borderWidth: responsiveSize(1.5),
  },
});

const Marshmallow: React.FC<IFrameComponentProps> = ({camera, media}) => {
  return (
    <ImageBackground
      source={MarshmallowBg}
      resizeMode="cover"
      style={styles.container}>
      <Box flex={false} style={styles.cameraContainer}>
        {camera}

        <FastImage
          source={MarshmallowLargeFrame}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.largeFrame}
        />
      </Box>

      <FastImage
        source={MarshmallowSmallFrame}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.smallFrame}
      />

      <FastImage
        source={{uri: media.poster}}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.poster}
      />

      <Box flex={false} style={styles.infoContainer}>
        <Typography
          variant="h4"
          fontFamily="Damion"
          color={colors.black}
          textAlign="center">
          {media.title}
        </Typography>
        <Box flex={false} style={styles.timeContainer}>
          <Typography variant="caps3" color="#242222" fontFamily="Damion">
            {dayjs(media.time).format('DD MMM, YYYY')}
          </Typography>
          <Typography variant="caps3" color="#242222" fontFamily="Damion">
            {media.genres}
          </Typography>
        </Box>
      </Box>
    </ImageBackground>
  );
};

export default Marshmallow;
