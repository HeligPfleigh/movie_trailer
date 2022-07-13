/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';

import {Box, Typography} from '@movie_trailer/components';
import {IFrameComponentProps} from '../../types';
import {
  NougatBg,
  NougatCameraFrame,
  NougatLongTape,
  NougatNoStringTape,
  NougatPaperInfo,
  NougatPoster,
  NougatShortTape,
} from '@movie_trailer/assets/pngs';
import FastImage from 'react-native-fast-image';
import {colors, responsiveSize} from '@movie_trailer/theme';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  cameraFrame: {
    position: 'absolute',
    top: responsiveSize(-50),
    left: responsiveSize(-10),
    width: responsiveSize(430),
    height: responsiveSize(511),
  },
  cameraContainer: {
    position: 'absolute',
    width: responsiveSize(300),
    height: responsiveSize(300),
    top: responsiveSize(40),
    left: responsiveSize(28),
  },
  shortTape: {
    position: 'absolute',
    top: 0,
    left: '38%',
    width: responsiveSize(80),
    height: responsiveSize(80),
  },
  paper: {
    position: 'absolute',
    bottom: responsiveSize(-44),
    right: responsiveSize(-10),
    width: responsiveSize(256),
    height: responsiveSize(224),
  },
  infoContainer: {
    position: 'absolute',
    width: responsiveSize(150),
    height: responsiveSize(100),
    bottom: responsiveSize(10),
    right: 0,
  },
  longTape: {
    position: 'absolute',
    top: 0,
    right: responsiveSize(20),
    width: responsiveSize(100),
    height: '82%',
  },
  noStringTape: {
    position: 'absolute',
    bottom: responsiveSize(120),
    left: responsiveSize(50),
    width: responsiveSize(68),
    height: responsiveSize(50),
  },
});

const Nougat: React.FC<IFrameComponentProps> = ({camera, media}) => {
  return (
    <ImageBackground
      source={NougatBg}
      resizeMode="cover"
      style={styles.container}>
      <FastImage
        source={NougatCameraFrame}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.cameraFrame}
      />

      <Box flex={false} style={styles.cameraContainer}>
        {camera}
      </Box>

      <FastImage
        source={NougatShortTape}
        resizeMode={FastImage.resizeMode.stretch}
        style={styles.shortTape}
      />

      <FastImage
        source={NougatPaperInfo}
        resizeMode={FastImage.resizeMode.stretch}
        style={styles.paper}
      />

      <Box flex={false} style={styles.infoContainer}>
        <Typography
          variant="h4"
          fontFamily="Handlee"
          textAlign="center"
          color={colors.black}>
          {media.title}
        </Typography>
        <Typography
          variant="caps3"
          color={colors.black}
          textAlign="center"
          fontFamily="Handlee">
          {dayjs(media.time).format('DD MMM, YYYY')}
        </Typography>
      </Box>

      <FastImage
        source={NougatLongTape}
        resizeMode={FastImage.resizeMode.stretch}
        style={styles.longTape}
      />

      <FastImage
        source={NougatPoster}
        resizeMode={FastImage.resizeMode.stretch}
        style={{
          position: 'absolute',
          bottom: responsiveSize(-20),
          left: responsiveSize(-20),
          width: responsiveSize(229),
          height: responsiveSize(202),
        }}
      />

      <FastImage
        source={NougatNoStringTape}
        resizeMode={FastImage.resizeMode.stretch}
        style={styles.noStringTape}
      />

      <FastImage
        source={{uri: media.poster}}
        resizeMode={FastImage.resizeMode.cover}
        style={{
          position: 'absolute',
          bottom: responsiveSize(46),
          left: responsiveSize(30),
          width: responsiveSize(98),
          height: responsiveSize(86),
          transform: [{rotate: '1deg'}],
        }}
      />
    </ImageBackground>
  );
};

export default Nougat;
