import {colors, responsiveSize, round, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import StarIcon from '@movie_trailer/assets/icons/Star';
import {Box, Typography} from '../common';
import PlayCircleFill2 from '@movie_trailer/assets/icons/PlayCircleFill2';
import Heart from '@movie_trailer/assets/icons/Heart';
import HeartFill from '@movie_trailer/assets/icons/HeartFill';

interface IMediaSearchCardProps {
  isLive?: boolean;
  id: string | number;
  title: string;
  poster: string;
  rating: number;
  genres: string;
  time: string;
  favorite?: boolean;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  thumbnail: {
    width: responsiveSize(155),
    height: responsiveSize(104),
    borderRadius: responsiveSize(16),
    position: 'relative',
    backgroundColor: colors.cadetBlue,
  },
  badge: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    top: spacing(1),
    left: spacing(1),
    paddingHorizontal: spacing(1),
    paddingVertical: spacing(0.5),
    borderRadius: responsiveSize(8),
    justifyContent: 'center',
  },
  tvBadge: {
    position: 'absolute',
    backgroundColor: colors.torchRed,
    bottom: 0,
    left: spacing(1),
    paddingHorizontal: spacing(1),
    paddingVertical: spacing(0.5),
    borderRadius: responsiveSize(8),
    justifyContent: 'center',
  },
  time: {
    backgroundColor: colors.cornflowerBlue,
    paddingHorizontal: spacing(1),
    paddingVertical: spacing(0.5),
    borderRadius: responsiveSize(8),
    maxWidth: responsiveSize(80),
  },
  favorite: {
    ...round(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MediaSearchCard: React.FC<IMediaSearchCardProps> = ({
  poster,
  rating,
  title,
  genres,
  isLive,
  time,
  favorite,
  onPress,
}: IMediaSearchCardProps) => {
  let icon = favorite ? (
    <HeartFill width={responsiveSize(12)} height={responsiveSize(12)} />
  ) : (
    <Heart width={responsiveSize(12)} height={responsiveSize(12)} />
  );

  icon = isLive ? <PlayCircleFill2 /> : icon;

  const backgroundColor = favorite
    ? 'rgba(255, 31, 31, 0.3)'
    : 'rgba(255, 255, 255, 0.3)';

  return (
    <TouchableOpacity onPress={onPress}>
      <Box row mb={3} pl={2} pr={2}>
        <Box flex={false} style={styles.thumbnail}>
          <FastImage
            source={{uri: poster}}
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />

          <Box flex={false} style={styles.badge}>
            <StarIcon />
            <Box flex={false} ml={0.5}>
              <Typography variant="caps3" color={colors.white}>
                {rating}
              </Typography>
            </Box>
          </Box>

          {isLive && (
            <Box flex={false} style={styles.tvBadge}>
              <Typography variant="caps3" color={colors.white}>
                TV Live
              </Typography>
            </Box>
          )}
        </Box>

        <Box ml={2} mr={1}>
          <Box flex={false} style={styles.time}>
            <Typography variant="caps3" color={colors.white}>
              {time}
            </Typography>
          </Box>
          <Typography variant="caps1" color={colors.zircon}>
            {title}
          </Typography>
          <Typography variant="caps2" color={colors.cadetBlue}>
            {genres}
          </Typography>
        </Box>

        <Box flex={false} middle>
          <Box flex={false} style={[styles.favorite, {backgroundColor}]}>
            {icon}
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default MediaSearchCard;
