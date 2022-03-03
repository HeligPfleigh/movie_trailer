import React, {useEffect, useState} from 'react';

import {
  AppBar,
  Box,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {MediaDetailScreenProps} from './types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {IMovieDetail} from '@movie_trailer/core/types';
import {getMovieDetail} from '@movie_trailer/core/apis';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import Calendar from '@movie_trailer/assets/icons/Calendar';
import AccessTime from '@movie_trailer/assets/icons/AccessTime';
import dayjs from 'dayjs';
import CreditSection from './CreditSection';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.codGray,
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
});

const MediaDetailScreen: React.FC<MediaDetailScreenProps> = ({
  navigation,
  route,
}: MediaDetailScreenProps) => {
  const [movie, setMovie] = useState<IMovieDetail>();
  const {id} = route.params;
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handleShareMedia = () => {
    // TODO
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setMovie(undefined);

        const movieData = await getMovieDetail(id);

        setMovie(movieData);
      } catch (error) {
        // TODO: handle error
      }
    };

    loadData();
  }, [id]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollview}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} onShare={handleShareMedia} />

      {movie ? (
        <>
          <Box mt={2} ml={2} mr={2} center flex={false}>
            <Typography variant="h4" color={colors.white} fontWeight="600">
              {movie.title}
            </Typography>
          </Box>

          <Box mt={0.5} ml={2} mr={2} flex={false} row middle>
            <Calendar />
            <Box flex={false} mr={2}>
              <Typography variant="h1" color={colors.catskillWhite}>
                {dayjs(movie.release_date).format('MMM DD, YYYY')}
              </Typography>
            </Box>
            <AccessTime />
            <Box flex={false}>
              <Typography variant="h1" color={colors.catskillWhite}>
                {`${Math.round(movie.runtime / 60)}h${movie.runtime % 60}`}
              </Typography>
            </Box>
          </Box>

          <Box flex={false} ml={2} mr={2} mt={2}>
            <Typography variant="b5" color={colors.white}>
              {movie.overview}
            </Typography>
          </Box>

          <CreditSection cast={movie.credits.cast} crew={movie.credits.crew} />
        </>
      ) : (
        <Box color="transparent" middle>
          <ActivityIndicator />
        </Box>
      )}
    </ScrollView>
  );
};

export default MediaDetailScreen;
