import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import {ActivityIndicator} from 'react-native';
import chunk from 'lodash/chunk';

import {Box, SectionB, Typography} from '@movie_trailer/components';
import {colors} from '@movie_trailer/theme';
import {MediaDetailRouteProps, MediaDetailNavigationProps} from './types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {ITVDetail} from '@movie_trailer/core/types';
import {getTVDetail, IMAGE_SERVER} from '@movie_trailer/core/apis';
import Calendar from '@movie_trailer/assets/icons/Calendar';
import Credit from './Sections/Credit';
import PosterCarousel from './Sections/PosterCarousel';
import Trailers from './Sections/Trailers';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@movie_trailer/store/rootReducer';
import {toggleMediaFavorite} from '@movie_trailer/store/slices/favoriteSlice';

const TVDetail: React.FC = () => {
  const route = useRoute<MediaDetailRouteProps>();
  const navigation = useNavigation<MediaDetailNavigationProps>();
  const [tvShow, setTVShow] = useState<ITVDetail>();
  const {id} = route.params;
  const favoriteTVs = useSelector((state: RootState) => state.favorite.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        setTVShow(undefined);

        const movieData = await getTVDetail(id);

        setTVShow(movieData);
      } catch (error) {
        // TODO: handle error
      }
    };

    loadData();
  }, [id]);

  const handlePressMedia = (tvId: number) =>
    navigation.push(NavigatorMap.MediaDetail, {id: tvId, type: 'tv'});

  const handleToggleFavorite = () => {
    if (tvShow) {
      dispatch(
        toggleMediaFavorite({
          id: tvShow.id,
          type: 'tv',
          poster: `${IMAGE_SERVER}${tvShow.poster_path}`,
          title: tvShow.name,
          rating: tvShow.vote_average,
          time: tvShow.first_air_date,
          genres: tvShow.genres.map(item => item.name).join('/ '),
        }),
      );
    }
  };

  if (!tvShow) {
    return (
      <Box color="transparent" middle>
        <ActivityIndicator />
      </Box>
    );
  }

  const medias = chunk(
    (tvShow?.recommendations.results || []).map(item => {
      const genre = (tvShow?.genres || []).map(g => g.name).join('/ ');

      return {
        id: item.id,
        title: item.name,
        genres: genre,
        poster: `${IMAGE_SERVER}${item.poster_path}`,
        rating: item.vote_average,
        time: item.first_air_date,
      };
    }),
    2,
  ).slice(0, 3);

  const isFavorite = Boolean(favoriteTVs.find(item => item.id === id));

  return (
    <Box>
      <PosterCarousel
        posters={tvShow.images.posters}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
      <Box mt={2} ml={2} mr={2} center flex={false}>
        <Typography variant="h4" color={colors.white} fontWeight="600">
          {tvShow.name}
        </Typography>
      </Box>

      <Box mt={0.5} ml={2} mr={2} flex={false} row middle>
        <Calendar />
        <Box flex={false} mr={2}>
          <Typography variant="h1" color={colors.catskillWhite}>
            {dayjs(tvShow.first_air_date).format('MMM DD, YYYY')}
          </Typography>
        </Box>
      </Box>

      <Credit cast={tvShow.credits.cast} crew={tvShow.credits.crew} />

      <Box flex={false} ml={2} mr={2}>
        <Typography variant="b5" color={colors.white}>
          {tvShow.overview}
        </Typography>
      </Box>

      <Trailers videos={tvShow.videos.results} />

      <Box flex={false} ml={2} mr={2} mt={2}>
        <SectionB medias={medias} onPressMedia={handlePressMedia} />
      </Box>
    </Box>
  );
};

export default TVDetail;