import Star from '@movie_trailer/assets/icons/Star';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet} from 'react-native';
import truncate from 'lodash/truncate';
import {Box, Typography} from '../common';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveSize(20),
    padding: spacing(1.5),
    width: responsiveSize(240),
    marginRight: spacing(1),
    height: responsiveSize(160),
  },
});

interface IReviewCardProps {
  user: string;
  rating: number;
  review: string;
}

const ReviewCard = ({user, rating, review}: IReviewCardProps) => {
  return (
    <Box style={styles.container}>
      <Box row center flex={false}>
        <Box flex={false}>
          <Star width={13} height={13} />
        </Box>
        <Box flex={false} ml={0.5} mr={0.5}>
          <Typography
            variant="b5"
            color={colors.white}
            fontFamily="Poppins-SemiBold">
            {rating.toFixed(1)}
          </Typography>
        </Box>
      </Box>

      <Box mt={1} mb={1} flex={false}>
        <Typography variant="b5" color={colors.white}>
          {user || 'Anonymous'}
        </Typography>
      </Box>

      <Typography variant="caps3" color="rgba(255, 255, 255, 0.5)">
        {truncate(review, {length: 120})}
      </Typography>
    </Box>
  );
};

export default ReviewCard;
