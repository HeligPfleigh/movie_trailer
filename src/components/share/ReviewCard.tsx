import Star from '@movie_trailer/assets/icons/Star';
import {colors} from '@movie_trailer/theme';
import React from 'react';
import {Box, Typography} from '../common';

interface IReviewCardProps {
  user: string;
  rating: number;
  review: string;
}

const ReviewCard = ({user, rating, review}: IReviewCardProps) => {
  return (
    <>
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
        {review}
      </Typography>
    </>
  );
};

export default ReviewCard;
