import {
  AppBar,
  Box,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {RootState} from '@movie_trailer/store/rootReducer';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {useSelector} from 'react-redux';
import ReviewIcon from '@movie_trailer/assets/icons/Review';
import {YourNoteScreenProps} from './types';
import {FlatList} from 'react-native-gesture-handler';
import {IPersonalReview} from '@movie_trailer/store/slices/personalReviewSlice';
import FastImage from 'react-native-fast-image';
import {StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import StarIcon from '@movie_trailer/assets/icons/Star';

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.codGray,
    flex: 1,
    flexGrow: 1,
    minHeight: 600,
  },
  thumbnail: {
    width: responsiveSize(155),
    height: responsiveSize(104),
    borderRadius: responsiveSize(16),
    backgroundColor: colors.cadetBlue,
    position: 'relative',
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
});

const YourNote: React.FC<YourNoteScreenProps> = ({
  navigation,
}: YourNoteScreenProps) => {
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const personalReviews = useSelector(
    (state: RootState) => state.personalReview.reviews,
  );

  const renderHeader = () => (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          Your Note
        </Typography>
      </Box>
    </Box>
  );

  const renderEmptyList = () => (
    <Box center mt={20}>
      <ReviewIcon width={125} height={120} />

      <Typography variant="h7" color={colors.white}>
        There isn't any personal review yet.
      </Typography>
    </Box>
  );

  const renderItem = ({item}: {item: IPersonalReview}) => (
    <Box flex={false} row ml={2} mr={2} mb={2}>
      <Box flex={false} style={styles.thumbnail}>
        <FastImage
          source={{
            uri: item.media.poster,
          }}
          style={styles.thumbnail}
          resizeMode={FastImage.resizeMode.cover}
        />

        <Box flex={false} style={styles.badge}>
          <StarIcon />
          <Box flex={false} ml={0.5}>
            <Typography variant="caps3" color={colors.white}>
              {item.review.rating}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box ml={2} mr={1} middle flex={false}>
        <Typography variant="caps1" color={colors.white}>
          {item.media.name}
        </Typography>
        <Typography variant="caps2" color="rgba(255, 255, 255, 0.6)">
          {`Reviewed on ${dayjs(item.review.reviewedDate).format(
            'MMM DD, YYYY',
          )}`}
        </Typography>
        <Typography variant="caps2" color={colors.white}>
          {`Note: ${item.review.note}`}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <FlatList
      ListHeaderComponent={renderHeader}
      ListEmptyComponent={renderEmptyList}
      data={personalReviews}
      renderItem={renderItem}
      keyExtractor={item => `${item.review.reviewedDate}`}
      style={styles.list}
      contentContainerStyle={{minHeight: responsiveSize(337)}}
    />
  );
};

export default YourNote;
