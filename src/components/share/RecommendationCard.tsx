import React from 'react';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';

import {Typography, Box} from '../common';
import StarIcon from '@movie_trailer/assets/icons/Star';

const styles = StyleSheet.create({
  imageContainer: {
    height: responsiveSize(229),
    width: '100%',
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

interface IRecommendationCardProps {
  title: string;
  genres: Array<string>;
  poster: string;
  rating: number;
  time: string;
}

const RecommendationCard: React.FC<IRecommendationCardProps> = ({
  title,
  genres,
  poster,
  rating,
  time,
}: IRecommendationCardProps) => {
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
        {genres.join('/ ')}
      </Typography>
    </TouchableOpacity>
  );
};

export default RecommendationCard;
