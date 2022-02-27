import React from 'react';

import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {Box, Typography} from '@movie_trailer/components';
import PopularGenres from './Sections/PopularGenres';
import Today from './Sections/Today';
import Upcoming from './Sections/Upcomming';
import {StyleSheet, TouchableOpacity} from 'react-native';
import ShowTime from './Sections/ShowTime';
import Recommendation from './Sections/Recommendation';

const styles = StyleSheet.create({
  seeAllBtn: {
    width: responsiveSize(124),
    padding: spacing(0.5),
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: responsiveSize(8),
  },
});

const MovieTab = () => {
  return (
    <>
      <Box flex={false} ml={2} mr={2} mb={4}>
        <PopularGenres />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={4}>
        <Today />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={3}>
        <Upcoming />
      </Box>

      <Box flex={false} center mb={5}>
        <TouchableOpacity>
          <Box flex={false} center style={styles.seeAllBtn}>
            <Typography variant="caps1" color={colors.white}>
              See All
            </Typography>
          </Box>
        </TouchableOpacity>
      </Box>

      <Box flex={false} ml={2} mr={2} mb={5}>
        <ShowTime />
      </Box>

      <Box flex={false} ml={2} mr={2} mb={3}>
        <Recommendation />
      </Box>
    </>
  );
};

export default MovieTab;
