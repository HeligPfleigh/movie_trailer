import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';

import {Box, Typography} from '@movie_trailer/components';
import {IFrameComponentProps} from '../../types';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import ActionBoard from './ActionBoard';
import ProCamera from './ProCamera';
import {LolipopCameraFrame} from '@movie_trailer/assets/pngs';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  cameraContainer: {
    height: responsiveSize(374),
    marginTop: spacing(4),
    marginHorizontal: spacing(2),
  },
  frame: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  actionBoard: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  proCamera: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  poster: {
    width: responsiveSize(119),
    height: responsiveSize(163),
    left: responsiveSize(20),
    bottom: responsiveSize(8),
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    position: 'absolute',
  },
  infoContainer: {
    position: 'absolute',
    left: responsiveSize(150),
    bottom: responsiveSize(20),
    width: '60%',
  },
});

const Lollipop: React.FC<IFrameComponentProps> = ({camera, media}) => {
  return (
    <Box color={colors.white} style={styles.container}>
      <Box flex={false} style={styles.cameraContainer}>
        {camera}

        <FastImage
          source={LolipopCameraFrame}
          resizeMode={FastImage.resizeMode.cover}
          style={styles.frame}
        />
      </Box>

      <ActionBoard
        style={styles.actionBoard}
        width={responsiveSize(62)}
        height={responsiveSize(80)}
      />
      <ProCamera
        style={styles.proCamera}
        width={responsiveSize(78)}
        height={responsiveSize(80)}
      />

      <FastImage
        source={{uri: media.poster}}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.poster}
      />

      <Box flex={false} style={styles.infoContainer}>
        <Typography variant="h4" fontFamily="Poppins-Bold" color={colors.black}>
          {media.title}
        </Typography>
        <Typography variant="caps3" color={colors.black}>
          {dayjs(media.time).format('DD MMM, YYYY')}
        </Typography>
      </Box>
    </Box>
  );
};

export default Lollipop;
