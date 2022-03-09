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
    borderRadius: responsiveSize(16),
    backgroundColor: colors.cadetBlue,
  },
  badge: {
    position: 'absolute',
    top: spacing(1),
    left: spacing(1),
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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

interface IRecommendationCardProps extends IMediaOverview {
  onPress?: () => void;
}

const RecommendationCard: React.FC<IRecommendationCardProps> = ({
  title,
  genres,
  poster,
  rating,
  time,
  onPress,
}: IRecommendationCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box flex={false} style={styles.imageContainer}>
        <ImageBackground
          source={{uri: poster}}
          resizeMode="cover"
          style={styles.imageContainer}
          imageStyle={{borderRadius: responsiveSize(16)}}>
          <Box flex={false} style={styles.badge}>
            <StarIcon />
            <Box flex={false} ml={0.5}>
              <Typography variant="caps3" color={colors.white}>
                {Number(rating).toFixed(1)}
              </Typography>
            </Box>
          </Box>

          {Boolean(time) && (
            <Box flex={false} style={styles.time}>
              <Typography variant="caps3" color={colors.white}>
                {time}
              </Typography>
            </Box>
          )}
        </ImageBackground>
      </Box>

      <Typography
        variant="caps1"
        color={colors.zircon}
        fontFamily="Poppins-Bold">
        {title}
      </Typography>

      <Typography variant="caps2" color={colors.cadetBlue}>
        {genres}
      </Typography>
    </TouchableOpacity>
  );
};

export default memo(RecommendationCard);
