import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';
import {ActivityIndicator} from 'react-native';
import chunk from 'lodash/chunk';

import {Box, SectionB, Typography} from '@movie_trailer/components';
import {colors} from '@movie_trailer/theme';
import {
  MediaDetailRouteProps,
  MediaDetailNavigationProps,
  MediaDetailRef,
} from './types';
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
import Reviews from './Sections/Reviews';
import BasicNativeAdsView from '@movie_trailer/components/ads/BasicNativeAdsView';

const MovieDetail = forwardRef<MediaDetailRef, {}>((_, ref) => {
  const route = useRoute<MediaDetailRouteProps>();
  const navigation = useNavigation<MediaDetailNavigationProps>();
  const [movie, setMovie] = useState<IMovieDetail>();
  const {id} = route.params;
  const favoriteMovies = useSelector(
    (state: RootState) => state.favorite.movie,
  );
  const dispatch = useDispatch();
  const personalReviews = useSelector(
    (state: RootState) => state.personalReview.reviews,
  )
    .filter(item => item.media.type === 'movie' && item.media.id === id)
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

  useImperativeHandle(
    ref,
    () => ({
      mediaName: movie?.title,
    }),
    [movie],
  );

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

  const handleSeeAllReviews = () => {
    if (movie) {
      navigation.push(NavigatorMap.UserReviews, {
        id: movie.id,
        type: 'movie',
        poster: `${IMAGE_SERVER}${movie.poster_path}`,
        reviews: movie.reviews.results,
        time: movie.release_date,
        title: movie.title,
        rating: movie.vote_average,
        ratingAmount: movie.vote_count,
      });
    }
  };

  const handleAddReview = () => {
    if (movie) {
      navigation.push(NavigatorMap.AddReview, {
        id: movie.id,
        type: 'movie',
        poster: `${IMAGE_SERVER}${movie.poster_path}`,
        time: movie.release_date,
        title: movie.title,
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

  const posters = [
    {
      aspect_ratio: -1,
      height: -1,
      file_path: movie.poster_path,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      width: -1,
    },
    ...movie.images.posters.filter(
      item => item.file_path !== movie.poster_path,
    ),
  ];

  const allReviews = [...personalReviews, ...movie.reviews.results];

  return (
    <Box>
      <PosterCarousel
        posters={posters}
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
        premierDate={dayjs(movie.release_date).toDate()}
        description={movie.overview}
      />

      <Box flex={false} ml={2} mr={2}>
        <Typography variant="b5" color={colors.white}>
          {movie.overview}
        </Typography>
      </Box>

      <Trailers videos={movie.videos.results} />

      <Box flex={false} ml={2} mr={2} mt={2}>
        <BasicNativeAdsView />
      </Box>

      <Box flex={false} ml={2} mr={2} mt={2}>
        <Reviews
          reviews={allReviews}
          averageRating={movie.vote_average}
          ratingAmount={movie.vote_count}
          onSeeAllReviews={handleSeeAllReviews}
          onAddReview={handleAddReview}
        />
      </Box>

      <Box flex={false} ml={2} mr={2} mt={2}>
        <SectionB
          medias={medias}
          onPressMedia={handlePressMedia}
          onSeeAll={handleSeeAll}
        />
      </Box>
    </Box>
  );
});

export default MovieDetail;
