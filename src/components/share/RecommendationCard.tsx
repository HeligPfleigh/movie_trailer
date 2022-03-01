import React, {memo} from 'react';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';

import {Typography, Box} from '../common';
import StarIcon from '@movie_trailer/assets/icons/Star';
import {IMediaOverview} from '@movie_trailer/core/types';

const styles = StyleSheet.create({
  imageContainer: {
    height: responsiveSize(229),
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: spacing(1),
    left: spacing(1),
    flexDirection: 'row',
    backgroundColor: colors.black,
    paddingHorizontal: spacing(1),
    paddingVertical: spacing(0.5),
    borderRadius: responsiveSize(8),
  },
  time: {
    position: 'absolute',
    bottom: spacing(1),
    left: spacing(1),
    backgroundColor: colors.cornflowerBlue,
    paddingHorizontal: spacing(1),
    paddingVertical: spacing(0.5),
    borderRadius: responsiveSize(8),
  },
});

const RecommendationCard: React.FC<IMediaOverview> = ({
  title,
  genres,
  poster,
  rating,
  time,
}: IMediaOverview) => {
  return (
    <TouchableOpacity>
      <ImageBackground
        source={{uri: poster}}
        resizeMode="cover"
        style={styles.imageContainer}
        imageStyle={{borderRadius: responsiveSize(16)}}>
        <Box flex={false} style={styles.badge}>
          <StarIcon />
          <Box flex={false} ml={0.5}>
            <Typography variant="caps3" color={colors.white}>
              {rating}
            </Typography>
          </Box>
        </Box>

        <Box flex={false} style={styles.time}>
          <Typography variant="caps3" color={colors.white}>
            {time}
          </Typography>
        </Box>
      </ImageBackground>

      <Typography variant="caps1" color={colors.zircon} fontWeight="700">
        {title}
      </Typography>

      <Typography variant="caps2" color={colors.cadetBlue}>
        {genres}
      </Typography>
    </TouchableOpacity>
  );
};

export default memo(RecommendationCard);
