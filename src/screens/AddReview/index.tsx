import Star from '@movie_trailer/assets/icons/Star';
import {
  AppBar,
  Box,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {addReview} from '@movie_trailer/store/slices/personalReviewSlice';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import dayjs from 'dayjs';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {AddReviewScreenProps} from './types';

const styles = StyleSheet.create({
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
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    color: colors.white,
    textAlignVertical: 'top',
  },
});

const AddReview: React.FC<AddReviewScreenProps> = ({
  navigation,
  route,
}: AddReviewScreenProps) => {
  const {poster, time, title, id, type} = route.params;
  const dispatch = useDispatch();

  const [rating, setRating] = useState<number>(0);
  const [titleReview, setTitleReview] = useState<string>('');
  const [noteReview, setNoteReview] = useState<string>('');

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handleChangeRating = (value: number) => () => setRating(value);

  const handleSubmitReview = () => {
    // add review
    dispatch(
      addReview({
        id,
        type,
        title: titleReview,
        note: noteReview,
        images: [],
        rating: rating * 2,
      }),
    );
    navigation.goBack();
  };

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(240)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          Add Review
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

      <Box ml={2} mr={2} mt={5} flex={false}>
        <Box flex={false}>
          <Typography variant="h7" color={colors.white}>
            Your rating
          </Typography>
          <Box row mt={1} flex={false} center>
            {[1, 2, 3, 4, 5].map(item => (
              <TouchableOpacity
                style={{marginRight: spacing(1)}}
                key={item}
                onPress={handleChangeRating(item)}>
                <Star
                  width={responsiveSize(30)}
                  height={responsiveSize(30)}
                  color={item > rating ? '#CBD5E0' : '#F3A228'}
                />
              </TouchableOpacity>
            ))}
            <Typography variant="h7" color={colors.white}>
              {rating}
              <Typography color="rgba(255, 255, 255, 0.5)">/5</Typography>
            </Typography>
          </Box>
        </Box>

        <Box flex={false} mt={3.5}>
          <Typography variant="h7" color={colors.white}>
            Title
          </Typography>
          <TextInput
            value={titleReview}
            onChangeText={setTitleReview}
            style={styles.input}
            placeholder="Title"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
          />
        </Box>

        <Box flex={false} mt={3.5}>
          <Typography variant="h7" color={colors.white}>
            Note
          </Typography>
          <TextInput
            value={noteReview}
            onChangeText={setNoteReview}
            style={styles.input}
            placeholder="Note"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
            multiline
            numberOfLines={4}
          />
        </Box>

        <Box flex={false} mt={3.5}>
          <Typography variant="h7" color={colors.white}>
            Images (Ticker, Checking, etc)
          </Typography>
        </Box>
      </Box>

      <TouchableOpacity style={styles.addReview} onPress={handleSubmitReview}>
        <Typography
          variant="b5"
          fontFamily="Poppins-SemiBold"
          color={colors.white}>
          Add a review
        </Typography>
      </TouchableOpacity>
    </Box>
  );
};

export default AddReview;
