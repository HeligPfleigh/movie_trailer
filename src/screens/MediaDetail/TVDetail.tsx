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
import Seasons from './Sections/Seasons';
import Reviews from './Sections/Reviews';

const TVDetail: React.FC = () => {
  const route = useRoute<MediaDetailRouteProps>();
  const navigation = useNavigation<MediaDetailNavigationProps>();
  const [tvShow, setTVShow] = useState<ITVDetail>();
  const {id} = route.params;
  const favoriteTVs = useSelector((state: RootState) => state.favorite.tv);
  const dispatch = useDispatch();
  const personalReviews = useSelector(
    (state: RootState) => state.personalReview.reviews,
  )
    .filter(item => item.media.type === 'tv' && item.media.id === id)
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

  const handleSeeAll = () => {
    if (tvShow) {
      navigation.push(NavigatorMap.ListMedia, {
        type: 'tv',
        title: 'Recommendation',
        url: `tv/${id}/recommendations`,
      });
    }
  };

  const handleSeeAllReviews = () => {
    if (tvShow) {
      navigation.push(NavigatorMap.UserReviews, {
        id: tvShow.id,
        type: 'tv',
        poster: `${IMAGE_SERVER}${tvShow.poster_path}`,
        reviews: tvShow.reviews.results,
        time: tvShow.first_air_date,
        title: tvShow.name,
        rating: tvShow.vote_average,
        ratingAmount: tvShow.vote_count,
      });
    }
  };

  const handleAddReview = () => {
    if (tvShow) {
      navigation.push(NavigatorMap.AddReview, {
        id: tvShow.id,
        type: 'tv',
        poster: `${IMAGE_SERVER}${tvShow.poster_path}`,
        time: tvShow.first_air_date,
        title: tvShow.name,
      });
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

  const posters = [
    {
      aspect_ratio: -1,
      height: -1,
      file_path: tvShow.poster_path,
      vote_average: tvShow.vote_average,
      vote_count: tvShow.vote_count,
      width: -1,
    },
    ...tvShow.images.posters.filter(
      item => item.file_path !== tvShow.poster_path,
    ),
  ];

  const allReviews = [...personalReviews, ...tvShow.reviews.results];

  return (
    <Box>
      <PosterCarousel
        posters={posters}
        isFavorite={isFavorite}
        homepage={tvShow.homepage}
        onToggleFavorite={handleToggleFavorite}
      />
      <Box mt={2} ml={2} mr={2} center flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          {tvShow.name}
        </Typography>
      </Box>

      {Boolean(tvShow.first_air_date) && (
        <Box mt={0.5} ml={2} mr={2} flex={false} row middle>
          <Calendar />
          <Box flex={false} ml={0.5}>
            <Typography variant="h1" color={colors.catskillWhite}>
              {dayjs(tvShow.first_air_date).format('MMM DD, YYYY')}
            </Typography>
          </Box>
        </Box>
      )}

      <Credit
        cast={tvShow.credits.cast}
        crew={tvShow.credits.crew}
        name={tvShow.name}
        description={tvShow.overview}
      />

      <Box flex={false} ml={2} mr={2}>
        <Typography variant="b5" color={colors.white}>
          {tvShow.overview}
        </Typography>
      </Box>

      <Seasons seasons={tvShow.seasons} id={tvShow.id} />

      <Trailers videos={tvShow.videos.results} />

      <Box flex={false} ml={2} mr={2} mt={2}>
        <Reviews
          reviews={allReviews}
          averageRating={tvShow.vote_average}
          ratingAmount={tvShow.vote_count}
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
};

export default TVDetail;
