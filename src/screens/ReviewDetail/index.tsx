import {
  AppBar,
  Box,
  HomeBackground,
  ReviewCard,
  Typography,
} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {ReviewDetailScreenProps} from './types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.codGray,
  },
  reviewContainer: {
    backgroundColor: '#414141',
    borderRadius: responsiveSize(20),
    padding: spacing(1.5),
    margin: spacing(2),
    marginBottom: spacing(1),
  },
});

const ReviewDetail: React.FC<ReviewDetailScreenProps> = ({
  navigation,
  route,
}: ReviewDetailScreenProps) => {
  const {review} = route.params;
  console.log({review});
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  return (
    <ScrollView style={styles.container}>
      <HomeBackground height={responsiveSize(300)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box ml={2} flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          User review
        </Typography>
      </Box>

      <TouchableOpacity>
        <Box style={styles.reviewContainer}>
          <ReviewCard
            user={review.author_details.name}
            rating={review.author_details.rating}
            review={review.content}
            images={review.images || []}
          />
        </Box>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReviewDetail;
