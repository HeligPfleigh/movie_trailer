import {
  AppBar,
  Box,
  HomeBackground,
  ReviewCard,
  Typography,
} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {UserReviewsScreenProps} from './types';
import Star from '@movie_trailer/assets/icons/Star';
import {IReview} from '@movie_trailer/core/types';
import Plus from '@movie_trailer/assets/icons/Plus';
import dayjs from 'dayjs';
import ReviewIcon from '@movie_trailer/assets/icons/Review';

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.codGray,
  },
  thumbnail: {
    width: responsiveSize(155),
    height: responsiveSize(104),
    borderRadius: responsiveSize(16),
    backgroundColor: colors.cadetBlue,
  },
  reviewContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: responsiveSize(20),
    padding: spacing(1.5),
    margin: spacing(2),
  },
  addReview: {
    paddingHorizontal: spacing(2),
    paddingVertical: spacing(1.25),
    borderRadius: 8,
    backgroundColor: colors.royalBlue,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: spacing(2),
  },
  emptyList: {minHeight: 300},
});

const UserReviews: React.FC<UserReviewsScreenProps> = ({
  route,
  navigation,
}: UserReviewsScreenProps) => {
  const {reviews, poster, rating, time, title, ratingAmount} = route.params;

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const renderItem = ({item}: {item: IReview}) => (
    <Box style={styles.reviewContainer}>
      <ReviewCard
        user={item.author_details.name}
        rating={item.author_details.rating}
        review={item.content}
      />
    </Box>
  );

  const myRating = 0;

  const renderHeader = () => (
    <Box color={colors.codGray}>
      <HomeBackground />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={4} ml={2} mb={2} flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          User Reviews
        </Typography>
      </Box>

      <Box flex={false} row ml={2} mr={2}>
        <Box flex={false} style={styles.thumbnail}>
          <FastImage
            source={{
              uri: poster,
            }}
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Box>

        <Box ml={2} mr={1} middle>
          <Typography variant="caps1" color={colors.white}>
            {title}
          </Typography>
          <Typography variant="caps2" color={colors.white}>
            {time ? dayjs(time).format('MMM DD, YYYY') : 'N/A'}
          </Typography>
        </Box>
      </Box>

      <Box row right flex={false} mt={4.5} ml={2} mr={2}>
        <Box flex={false} mb={1}>
          <Star width={30} height={30} />
        </Box>
        <Box flex={false} ml={0.5} mr={0.5}>
          <Typography
            variant="h3"
            color={colors.white}
            fontFamily="Poppins-Bold">
            {rating.toFixed(1)}
          </Typography>
        </Box>

        <Box flex={false} mb={1}>
          <Typography variant="h7" color="rgba(255, 255, 255, 0.5)">
            {ratingAmount}
          </Typography>
        </Box>
      </Box>

      <Box flex={false} ml={2} mr={2}>
        <Typography variant="h7" color={colors.white}>
          {`Your rating: ${myRating}/10`}
        </Typography>
      </Box>
    </Box>
  );

  const renderFooter = () => (
    <TouchableOpacity style={styles.addReview}>
      <Plus />
      <Box ml={1} flex={false}>
        <Typography
          variant="b5"
          fontFamily="Poppins-SemiBold"
          color={colors.white}>
          Add a review
        </Typography>
      </Box>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <Box center style={styles.emptyList} middle>
      <ReviewIcon width={125} height={120} />

      <Typography variant="h7" color={colors.white}>
        There are no reviews yet
      </Typography>
    </Box>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmptyList}
      data={reviews}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}`}
      style={styles.list}
    />
  );
};

export default UserReviews;
