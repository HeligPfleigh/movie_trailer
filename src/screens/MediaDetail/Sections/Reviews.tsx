import Plus from '@movie_trailer/assets/icons/Plus';
import ReviewIcon from '@movie_trailer/assets/icons/Review';
import Star from '@movie_trailer/assets/icons/Star';
import {
  Box,
  ReviewCard,
  SectionHeader,
  Typography,
} from '@movie_trailer/components';
import {IReview} from '@movie_trailer/core/types';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {truncate} from 'lodash';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  addReview: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1.25),
    borderRadius: 8,
    backgroundColor: colors.royalBlue,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing(2),
  },
  reviewContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveSize(20),
    padding: spacing(1.5),
    width: responsiveSize(240),
    marginRight: spacing(1),
    height: responsiveSize(160),
  },
});

interface IReviewProps {
  reviews: Array<IReview>;
  averageRating: number;
  myRating?: number;
  ratingAmount: number;
  onSeeAllReviews?: () => void;
}

const Reviews = ({
  reviews,
  averageRating,
  myRating,
  ratingAmount,
  onSeeAllReviews,
}: IReviewProps) => {
  const renderItem = ({item}: {item: IReview}) => (
    <Box style={styles.reviewContainer}>
      <ReviewCard
        user={item.author_details.name}
        rating={item.author_details.rating}
        review={truncate(item.content, {length: 120})}
      />
    </Box>
  );

  return (
    <>
      <SectionHeader title="User review" onPress={onSeeAllReviews} />

      <Box row right>
        <Box flex={false} mb={1}>
          <Star width={30} height={30} />
        </Box>
        <Box flex={false} ml={0.5} mr={0.5}>
          <Typography
            variant="h3"
            color={colors.white}
            fontFamily="Poppins-Bold">
            {averageRating.toFixed(1)}
          </Typography>
        </Box>

        <Box flex={false} mb={1}>
          <Typography variant="h7" color="rgba(255, 255, 255, 0.5)">
            {ratingAmount}
          </Typography>
        </Box>
      </Box>

      {myRating ? (
        <Box flex={false}>
          <Typography variant="h7" color={colors.white}>
            {`Your rating: ${myRating}/10`}
          </Typography>
        </Box>
      ) : null}

      {!reviews.length ? (
        <Box center>
          <ReviewIcon width={125} height={120} />

          <Typography variant="h7" color={colors.white}>
            There are no reviews yet
          </Typography>
        </Box>
      ) : null}

      <TouchableOpacity style={styles.addReview}>
        <Plus />
        <Box ml={1} flex={false}>
          <Typography variant="b5" color={colors.white}>
            Add a review
          </Typography>
        </Box>
      </TouchableOpacity>

      <Box mt={2} mb={1.5}>
        <Typography
          variant="h7"
          fontFamily="Poppins-SemiBold"
          color={colors.white}>
          Most helpful reviews
        </Typography>

        <FlatList
          data={reviews}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          style={{marginTop: spacing(1.5)}}
          horizontal
        />
      </Box>
    </>
  );
};

export default Reviews;
