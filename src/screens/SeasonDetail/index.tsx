import Calendar from '@movie_trailer/assets/icons/Calendar';
import {
  AppBar,
  Box,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import {getSeasonDetail, IMAGE_SERVER} from '@movie_trailer/core/apis';
import {ISeasonDetail} from '@movie_trailer/core/types';
import {colors, responsiveSize} from '@movie_trailer/theme';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Episodes from './Episodes';
import {SeasonDetailScreenProps} from './types';

const {width: viewportWidth} = Dimensions.get('window');
const isIPad = Platform.OS === 'ios' && Platform.isPad;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.codGray,
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
  poster: {
    height: responsiveSize(396),
    width: isIPad ? viewportWidth * 0.75 : responsiveSize(283),
    borderRadius: responsiveSize(16),
    backgroundColor: colors.cadetBlue,
  },
});

const SeasonDetailScreen: React.FC<SeasonDetailScreenProps> = ({
  route,
}: SeasonDetailScreenProps) => {
  const [seasonDetail, setSeasonDetail] = useState<ISeasonDetail>();
  const {tvID, seasonNumber} = route.params;

  useEffect(() => {
    const loadData = async () => {
      try {
        setSeasonDetail(undefined);

        const seasonData = await getSeasonDetail(tvID, seasonNumber);

        setSeasonDetail(seasonData);
      } catch (error) {
        // TODO: handle error
      }
    };

    loadData();
  }, [tvID, seasonNumber]);

  if (!seasonDetail) {
    return (
      <Box color={colors.codGray}>
        <HomeBackground height={responsiveSize(337)} />
        <AppBar />

        <Box color="transparent" middle>
          <ActivityIndicator />
        </Box>
      </Box>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollview}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar />

      <Box flex={false} center mt={4}>
        <Box flex={false} style={styles.poster}>
          <FastImage
            source={{uri: `${IMAGE_SERVER}${seasonDetail.poster_path}`}}
            style={styles.poster}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Box>
      </Box>

      <Box mt={2} ml={2} mr={2} center flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          {seasonDetail.name}
        </Typography>
      </Box>

      {Boolean(seasonDetail.air_date) && (
        <Box mt={0.5} ml={2} mr={2} flex={false} row middle>
          <Calendar />
          <Box flex={false} ml={0.5}>
            <Typography variant="h1" color={colors.catskillWhite}>
              {dayjs(seasonDetail.air_date).format('MMM DD, YYYY')}
            </Typography>
          </Box>
        </Box>
      )}

      <Box flex={false} ml={2} mr={2}>
        <Typography variant="b5" color={colors.white}>
          {seasonDetail.overview}
        </Typography>
      </Box>

      <Box flex={false} ml={2} mr={2} mt={2}>
        <Episodes episodes={seasonDetail.episodes} />
      </Box>
    </ScrollView>
  );
};

export default SeasonDetailScreen;
