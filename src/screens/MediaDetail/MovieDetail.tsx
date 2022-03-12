import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import {ActivityIndicator} from 'react-native';
import chunk from 'lodash/chunk';

import {Box, SectionB, Typography} from '@movie_trailer/components';
import {colors} from '@movie_trailer/theme';
import {MediaDetailRouteProps, MediaDetailNavigationProps} from './types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {IMovieDetail} from '@movie_trailer/core/types';
import {getMovieDetail, IMAGE_SERVER} from '@movie_trailer/core/apis';
import Calendar from '@movie_trailer/assets/icons/Calendar';
import AccessTime from '@movie_trailer/assets/icons/AccessTime';
import Credit from './Sections/Credit';
import PosterCarousel from './Sections/PosterCarousel';
import Trailers from './Sections/Trailers';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@movie_trailer/store/rootReducer';
import {toggleMediaFavorite} from '@movie_trailer/store/slices/favoriteSlice';

const MovieDetail: React.FC = () => {
  const route = useRoute<MediaDetailRouteProps>();
  const navigation = useNavigation<MediaDetailNavigationProps>();
  const [movie, setMovie] = useState<IMovieDetail>();
  const {id} = route.params;
  const favoriteMovies = useSelector(
    (state: RootState) => state.favorite.movie,
  );
  const dispatch = useDispatch();

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

  const handlePressMedia = (movieId: number) =>
    navigation.push(NavigatorMap.MediaDetail, {id: movieId, type: 'movie'});

  const handleToggleFavorite = () => {
    if (movie) {
      dispatch(
        toggleMediaFavorite({
          id: movie.id,
          type: 'movie',
          poster: `${IMAGE_SERVER}${movie.poster_path}`,
          title: movie.title,
          rating: movie.vote_average,
          time: movie.release_date,
          genres: movie.genres.map(item => item.name).join('/ '),
        }),
      );
    }
  };

  const handleSeeAll = () => {
    if (movie) {
      navigation.push(NavigatorMap.ListMedia, {
        type: 'movie',
        title: 'Recommendation',
        url: `movie/${id}/recommendations`,
      });
    }
  };

  if (!movie) {
    return (
      <Box color="transparent" middle>
        <ActivityIndicator />
      </Box>
    );
  }

  const medias = chunk(
    movie.recommendations.results.map(item => {
      const genre = movie.genres.map(g => g.name).join('/ ');

      return {
        id: item.id,
        title: item.title,
        genres: genre,
        poster: `${IMAGE_SERVER}${item.poster_path}`,
        rating: item.vote_average,
        time: item.release_date,
      };
    }),
    2,
  ).slice(0, 3);

  const isFavorite = Boolean(favoriteMovies.find(item => item.id === id));

  return (
    <Box>
      <PosterCarousel
        posters={movie.images.posters}
        isFavorite={isFavorite}
        homepage={movie.homepage}
        onToggleFavorite={handleToggleFavorite}
      />

      <Box mt={2} ml={2} mr={2} center flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          {movie.title}
        </Typography>
      </Box>

      <Box mt={0.5} ml={2} mr={2} flex={false} row middle>
        {Boolean(movie.release_date) && (
          <>
            <Calendar />
            <Box flex={false} mr={2} ml={0.5}>
              <Typography variant="h1" color={colors.catskillWhite}>
                {dayjs(movie.release_date).format('MMM DD, YYYY')}
              </Typography>
            </Box>
          </>
        )}

        {Boolean(movie.runtime) && (
          <>
            <AccessTime />
            <Box flex={false} ml={0.5}>
              <Typography variant="h1" color={colors.catskillWhite}>
                {`${Math.round(movie.runtime / 60)}h${movie.runtime % 60}`}
              </Typography>
            </Box>
          </>
        )}
      </Box>

      <Credit
        cast={movie.credits.cast}
        crew={movie.credits.crew}
        name={movie.title}
      />

      <Box flex={false} ml={2} mr={2}>
        <Typography variant="b5" color={colors.white}>
          {movie.overview}
        </Typography>
      </Box>

      <Trailers videos={movie.videos.results} />

      <Box flex={false} ml={2} mr={2} mt={2}>
        <SectionB
          medias={medias}
          onPressMedia={handlePressMedia}
          onSeeAll={handleSeeAll}
        />
      </Box>
    </Box>
  );
};

export default MovieDetail;
