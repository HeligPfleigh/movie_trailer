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
import {useSelector} from 'react-redux';
import {RootState} from '@movie_trailer/store/rootReducer';

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
    marginBottom: spacing(1),
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
  const {id, type, reviews, poster, rating, time, title, ratingAmount} =
    route.params;

  const personalReviews = useSelector(
    (state: RootState) => state.personalReview.reviews,
  )
    .filter(item => item.media.type === type && item.media.id === id)
    .map(item => ({
      author: 'Me',
      author_details: {
        name: 'Me',
        username: 'Me',
        avatar_path: '',
        rating: item.review.rating,
      },
      content: `${item.review.title}\n${item.review.note}`,
      id: item.review.reviewedDate,
      images: item.review.images,
    }));

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handleOpenReviewDetail = (review: IReview) => () => {
    navigation.navigate(NavigatorMap.ReviewDetail, {
      review,
    });
  };

  const renderItem = ({item}: {item: IReview}) => (
    <TouchableOpacity onPress={handleOpenReviewDetail(item)}>
      <Box style={styles.reviewContainer}>
        <ReviewCard
          user={item.author_details.name}
          rating={item.author_details.rating}
          review={item.content}
          images={item.images || []}
        />
      </Box>
    </TouchableOpacity>
  );

  const myRating = personalReviews.length
    ? personalReviews.reduce(
        (prev, curr) => prev + curr.author_details.rating,
        0,
      ) / personalReviews.length
    : 0;

  const renderHeader = () => (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(300)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box ml={2} mb={2} flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          User review
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

      <Box row right flex={false} mt={5} ml={2} mr={2}>
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

  const navigateToAddReview = () =>
    navigation.push(NavigatorMap.AddReview, {
      id,
      type,
      poster,
      time,
      title,
    });

  const renderFooter = () => (
    <TouchableOpacity style={styles.addReview} onPress={navigateToAddReview}>
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
        There aren't any reviews yet.
      </Typography>
    </Box>
  );

  const allReviews = [...personalReviews, ...reviews];

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmptyList}
      data={allReviews}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}`}
      style={styles.list}
    />
  );
};

export default UserReviews;
