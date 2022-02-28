import {IMediaOverview} from '@movie_trailer/core/types';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import StarIcon from '@movie_trailer/assets/icons/Star';
import {Box, Typography} from '../common';
import PlayCircleFill2 from '@movie_trailer/assets/icons/PlayCircleFill2';

interface IMediaSearchCardProps extends IMediaOverview {
  isTVShow?: boolean;
}

const styles = StyleSheet.create({
  thumbnail: {
    width: responsiveSize(155),
    height: responsiveSize(104),
    borderRadius: responsiveSize(16),
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: colors.black,
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
});

const MediaSearchCard: React.FC<IMediaSearchCardProps> = ({
  poster,
  rating,
  title,
  genres,
  isTVShow,
  time,
}: IMediaSearchCardProps) => {
  return (
    <TouchableOpacity>
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

          {isTVShow && (
            <Box flex={false} style={styles.tvBadge}>
              <Typography variant="caps3" color={colors.white}>
                TV Live
              </Typography>
            </Box>
          )}
        </Box>

        <Box ml={2}>
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
          <PlayCircleFill2 />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default MediaSearchCard;
