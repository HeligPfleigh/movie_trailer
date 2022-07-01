import {ImageBackground, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {KitKatBg} from '@movie_trailer/assets/pngs';
import {Box, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {IFrameComponentProps} from '../../types';
import BigPin from './BigPin';
import SmallPin from './SmallPin';
import MediumPin from './MediumPin';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigPin: {
    position: 'absolute',
    left: '45%',
    top: responsiveSize(2),
  },
  posterContainer: {
    width: responsiveSize(128),
    height: responsiveSize(176),
    bottom: responsiveSize(12),
    left: responsiveSize(12),
    transform: [{rotate: '-6deg'}],
    backgroundColor: colors.white,
    padding: spacing(1),
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  smallPin: {
    position: 'absolute',
    bottom: responsiveSize(140),
    left: responsiveSize(45),
  },
  cameraContainer: {
    marginHorizontal: spacing(3),
    marginTop: spacing(3),
    width: responsiveSize(335),
    height: responsiveSize(330),
    backgroundColor: colors.white,
    padding: spacing(1.25),
  },
  infoContainer: {
    width: responsiveSize(173),
    height: responsiveSize(173),
    transform: [{rotate: '12deg'}],
    backgroundColor: colors.white,
    bottom: responsiveSize(20),
    right: responsiveSize(20),
    position: 'absolute',
    padding: spacing(1),
  },
  mediumPin: {
    position: 'absolute',
    bottom: responsiveSize(142),
    right: responsiveSize(55),
  },
});

const KitKat: React.FC<IFrameComponentProps> = ({
  media,
  camera,
}: IFrameComponentProps) => {
  return (
    <ImageBackground
      source={KitKatBg}
      resizeMode="cover"
      style={styles.container}>
      <Box flex={false} style={styles.cameraContainer}>
        {camera}
      </Box>
      <BigPin style={styles.bigPin} />

      <Box flex={false} style={styles.posterContainer}>
        <FastImage
          source={{uri: media.poster}}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.poster}
        />
      </Box>
      <SmallPin style={styles.smallPin} />

      <Box flex={false} style={styles.infoContainer}>
        <Box color="#254D70" flex={false} style={styles.poster} p={1}>
          <Typography
            variant="h4"
            fontFamily="Poppins-Bold"
            color={colors.white}>
            {media.title}
          </Typography>
          <Typography variant="caps3" color={colors.white}>
            {dayjs(media.time).format('DD MMM, YYYY')}
          </Typography>
        </Box>
      </Box>
      <MediumPin style={styles.mediumPin} />
    </ImageBackground>
  );
};

export default KitKat;
