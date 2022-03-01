import {IActorOverview} from '@movie_trailer/core/types';
import {colors, responsiveSize} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box, Typography} from '../common';
import PlayCircleFill2 from '@movie_trailer/assets/icons/PlayCircleFill2';

const styles = StyleSheet.create({
  thumbnail: {
    width: responsiveSize(155),
    height: responsiveSize(104),
    borderRadius: responsiveSize(16),
  },
});

const ActorSearchCard: React.FC<IActorOverview> = ({
  name,
  thumbnail,
  department,
}: IActorOverview) => {
  return (
    <TouchableOpacity>
      <Box row mb={3} pl={2} pr={2}>
        <Box flex={false} style={styles.thumbnail}>
          <FastImage
            source={{uri: thumbnail}}
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Box>

        <Box ml={2}>
          <Typography variant="caps1" color={colors.zircon}>
            {name}
          </Typography>
          <Typography variant="caps2" color={colors.cadetBlue}>
            {department}
          </Typography>
        </Box>

        <Box flex={false} middle>
          <PlayCircleFill2 />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default ActorSearchCard;
