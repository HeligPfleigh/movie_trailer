import {
  AppBar,
  Box,
  HomeBackground,
  SectionHeader,
  Typography,
} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {colors, responsiveSize} from '@movie_trailer/theme';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import PopularFrames from './components/PopularFrames';
import {MovieSelfieScreenProps} from './types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.codGray,
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
});

const MovieSelfieScreen: React.FC<MovieSelfieScreenProps> = ({
  navigation,
}: MovieSelfieScreenProps) => {
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollview}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          Movie Selfie
        </Typography>
      </Box>

      <Box flex={false} m={2}>
        <SectionHeader title="Recently Used" />
      </Box>

      <Box flex={false} m={2}>
        <SectionHeader title="Popular Frame" />

        <PopularFrames />
      </Box>
    </ScrollView>
  );
};

export default MovieSelfieScreen;
