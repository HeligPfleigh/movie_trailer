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
import {colors} from '@movie_trailer/theme';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
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
        style={{
          position: 'absolute',
          top: -50,
          left: -10,
          width: 430,
          height: 511,
        }}
      />

      <Box
        flex={false}
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          top: 40,
          left: 28,
        }}>
        {camera}
      </Box>

      <FastImage
        source={NougatShortTape}
        resizeMode={FastImage.resizeMode.stretch}
        style={{
          position: 'absolute',
          top: 0,
          left: '38%',
          width: 80,
          height: 80,
        }}
      />

      <FastImage
        source={NougatPaperInfo}
        resizeMode={FastImage.resizeMode.stretch}
        style={{
          position: 'absolute',
          bottom: -44,
          right: -10,
          width: 256,
          height: 224,
        }}
      />

      <Box
        flex={false}
        style={{
          position: 'absolute',
          width: 150,
          height: 100,
          bottom: 10,
          right: 0,
        }}>
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
        style={{
          position: 'absolute',
          top: 0,
          right: 20,
          width: 100,
          height: 430,
        }}
      />

      <FastImage
        source={NougatPoster}
        resizeMode={FastImage.resizeMode.stretch}
        style={{
          position: 'absolute',
          bottom: -20,
          left: -20,
          width: 229,
          height: 202,
        }}
      />

      <FastImage
        source={NougatNoStringTape}
        resizeMode={FastImage.resizeMode.stretch}
        style={{
          position: 'absolute',
          bottom: 120,
          left: 50,
          width: 68,
          height: 50,
        }}
      />

      <FastImage
        source={{uri: media.poster}}
        resizeMode={FastImage.resizeMode.cover}
        style={{
          position: 'absolute',
          bottom: 46,
          left: 30,
          width: 98,
          height: 86,
          transform: [{rotate: '1deg'}],
        }}
      />
    </ImageBackground>
  );
};

export default Nougat;
