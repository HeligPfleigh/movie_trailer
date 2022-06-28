import {ImageBackground, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

import {JellyBeanBg} from '@movie_trailer/assets/pngs';
import {Box, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {IFrameComponentProps} from '../../types';
import BigCurvy from './BigCurvy';
import BigTape from './BigTape';
import SmallCurvy from './SmallCurvy';
import SmallTape from './SmallTape';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    padding: spacing(2),
    justifyContent: 'flex-end',
  },
  bigCurvy: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bigTape: {
    position: 'absolute',
    top: responsiveSize(-24),
    left: responsiveSize(110),
  },
  smallCurvy: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  smallTape: {
    position: 'absolute',
    bottom: responsiveSize(120),
    right: responsiveSize(40),
  },
  infoContainer: {
    maxWidth: responsiveSize(250),
    maxHeight: responsiveSize(200),
    overflow: 'hidden',
  },
  poster: {
    width: responsiveSize(120),
    height: responsiveSize(120),
    backgroundColor: colors.cadetBlue,
    position: 'absolute',
    bottom: responsiveSize(14),
    right: responsiveSize(15),
    transform: [{rotate: '6deg'}],
  },
  cameraContainer: {
    width: responsiveSize(296),
    height: responsiveSize(298),
    position: 'absolute',
    top: responsiveSize(34),
    left: responsiveSize(18),
    transform: [{rotate: '-6.5deg'}],
  },
});

const JellyBean: React.FC<IFrameComponentProps> = ({
  media,
  camera,
}: IFrameComponentProps) => {
  return (
    <ImageBackground
      source={JellyBeanBg}
      resizeMode="cover"
      style={styles.container}>
      <BigCurvy style={styles.bigCurvy} />
      <Box flex={false} style={styles.cameraContainer}>
        {camera}
      </Box>
      <BigTape style={styles.bigTape} />

      <SmallCurvy style={styles.smallCurvy} />
      <FastImage
        source={{uri: media.poster}}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.poster}
      />
      <SmallTape style={styles.smallTape} />

      <Box flex={false} style={styles.infoContainer}>
        <Typography variant="h4" fontFamily="Poppins-Bold" color={colors.white}>
          {media.title}
        </Typography>
        <Typography variant="caps3" color={colors.white}>
          {dayjs(media.time).format('DD MMM, YYYY')}
        </Typography>
      </Box>
    </ImageBackground>
  );
};

export default JellyBean;
