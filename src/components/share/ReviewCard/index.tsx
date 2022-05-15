import Star from '@movie_trailer/assets/icons/Star';
import {colors, responsiveSize} from '@movie_trailer/theme';
import React from 'react';
import {Box, Typography} from '../../common';
import Gallery from './Gallery';

interface IReviewCardProps {
  user: string;
  rating: number;
  review: string;
  images: string[];
}

const ReviewCard = ({user, rating, review, images}: IReviewCardProps) => {
  return (
    <>
      <Box row center flex={false}>
        <Box flex={false}>
          <Star width={responsiveSize(13)} height={responsiveSize(13)} />
        </Box>
        <Box flex={false} ml={0.5} mr={0.5}>
          <Typography
            variant="b5"
            color={colors.white}
            fontFamily="Poppins-SemiBold">
            {(rating || 0).toFixed(1)}
          </Typography>
        </Box>
      </Box>

      {images.length ? <Gallery images={images} /> : null}

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
