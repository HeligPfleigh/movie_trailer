import {IActorOverview} from '@movie_trailer/core/types';
import {colors, responsiveSize, round} from '@movie_trailer/theme';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {Box, Typography} from '../common';
import Heart from '@movie_trailer/assets/icons/Heart';
import HeartFill from '@movie_trailer/assets/icons/HeartFill';

const styles = StyleSheet.create({
  thumbnail: {
    width: responsiveSize(94),
    height: responsiveSize(94),
    borderRadius: responsiveSize(16),
    backgroundColor: colors.cadetBlue,
  },
  favorite: {
    ...round(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface IActorSearchCardProps extends IActorOverview {
  onPress?: () => void;
  onPressFavorite?: () => void;
}

const ActorSearchCard: React.FC<IActorSearchCardProps> = ({
  name,
  thumbnail,
  department,
  favorite,
  onPress,
  onPressFavorite,
}: IActorSearchCardProps) => {
  const icon = favorite ? (
    <HeartFill width={responsiveSize(12)} height={responsiveSize(12)} />
  ) : (
    <Heart width={responsiveSize(12)} height={responsiveSize(12)} />
  );

  const backgroundColor = favorite
    ? 'rgba(255, 31, 31, 0.3)'
    : 'rgba(255, 255, 255, 0.3)';
  return (
    <TouchableOpacity onPress={onPress}>
      <Box row mb={3} pl={2} pr={2}>
        <Box flex={false} style={styles.thumbnail}>
          <Image
            source={{uri: thumbnail}}
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Box>

        <Box ml={2} middle>
          <Typography variant="caps1" color={colors.zircon}>
            {name}
          </Typography>
          <Typography variant="caps2" color={colors.cadetBlue}>
            {department}
          </Typography>
        </Box>

        <Box flex={false} middle>
          <TouchableOpacity
            style={[styles.favorite, {backgroundColor}]}
            onPress={onPressFavorite}>
            {icon}
          </TouchableOpacity>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default ActorSearchCard;
