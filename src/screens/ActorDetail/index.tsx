import chunk from 'lodash/chunk';
import FastImage from 'react-native-fast-image';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  AppBar,
  Box,
  HomeBackground,
  SectionB,
  Typography,
} from '@movie_trailer/components';
import {getActorDetails, IMAGE_SERVER} from '@movie_trailer/core/apis';
import {IActorDetail} from '@movie_trailer/core/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {colors, responsiveSize, round} from '@movie_trailer/theme';
import InfoBox from './InfoBox';
import {ActorDetailScreenProps} from './types';
import TVSection from './TVSection';
import {RootState} from '@movie_trailer/store/rootReducer';
import Heart from '@movie_trailer/assets/icons/Heart';
import HeartFill from '@movie_trailer/assets/icons/HeartFill';
import {togglePersonFavorite} from '@movie_trailer/store/slices/favoriteSlice';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.codGray,
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
  profileImage: {
    width: responsiveSize(215),
    height: responsiveSize(264),
    borderRadius: responsiveSize(16),
    backgroundColor: colors.cadetBlue,
    position: 'relative',
  },
  favorite: {
    ...round(24),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: responsiveSize(8),
    right: responsiveSize(8),
  },
});

const ActorDetailScreen: React.FC<ActorDetailScreenProps> = ({
  navigation,
  route,
}: ActorDetailScreenProps) => {
  const [actor, setActor] = useState<IActorDetail>();
  const {id} = route.params;
  const genres = useSelector((state: RootState) => state.genre.movieGenres);
  const favoriteActors = useSelector(
    (state: RootState) => state.favorite.person,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {
      try {
        setActor(undefined);

        const actorData = await getActorDetails(id);

        setActor(actorData);
      } catch (error) {
        // TODO: handle error
      }
    };

    loadData();
  }, [id]);

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handlePressMovie = (movieID: number) =>
    navigation.navigate(NavigatorMap.MediaDetail, {id: movieID, type: 'movie'});

  const handleToggleFavorite = () => {
    if (actor) {
      dispatch(
        togglePersonFavorite({
          id: actor.id,
          name: actor.name,
          department: actor.known_for_department,
          thumbnail: actor.profile_path,
        }),
      );
    }
  };

  const movies = chunk(
    (actor?.movie_credits?.cast || []).map(movie => {
      const genre = genres
        .filter(item => movie.genre_ids.includes(item.id))
        .map(item => item.name)
        .join('/ ');

      return {
        id: movie.id,
        title: movie.title,
        genres: genre,
        poster: `${IMAGE_SERVER}${movie.poster_path}`,
        rating: movie.vote_average,
        time: movie.release_date,
      };
    }),
    2,
  );

  const favorite = Boolean(favoriteActors.find(item => item.id === id));

  let icon = favorite ? (
    <HeartFill width={responsiveSize(12)} height={responsiveSize(12)} />
  ) : (
    <Heart width={responsiveSize(12)} height={responsiveSize(12)} />
  );

  const backgroundColor = favorite
    ? 'rgba(255, 31, 31, 0.3)'
    : 'rgba(255, 255, 255, 0.3)';

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollview}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      {actor ? (
        <>
          <Box mt={2.5} ml={2} mb={2} flex={false}>
            <Typography variant="h4" color={colors.white} fontWeight="600">
              {actor.name}
            </Typography>
          </Box>

          <Box flex={false} center mt={5}>
            <Box flex={false} style={styles.profileImage}>
              <FastImage
                source={{uri: `${IMAGE_SERVER}${actor.profile_path}`}}
                style={styles.profileImage}
                resizeMode={FastImage.resizeMode.cover}
              />
              <TouchableOpacity
                style={[styles.favorite, {backgroundColor}]}
                onPress={handleToggleFavorite}>
                {icon}
              </TouchableOpacity>
            </Box>
          </Box>

          <Box mt={1.5} center flex={false}>
            <Typography variant="h5" color={colors.white} fontWeight="600">
              {actor.name}
            </Typography>
          </Box>

          <Box mt={0.5} center flex={false}>
            <Typography variant="caps1" color={colors.geyser} fontWeight="400">
              {actor.known_for_department}
            </Typography>
          </Box>

          <InfoBox title="Date of birth" value={actor.birthday} />
          <InfoBox title="Place of birth" value={actor.place_of_birth} />
          <InfoBox
            title="Total Films"
            value={actor.movie_credits.cast.length}
          />

          {/** TODO: add galery section */}

          <Box mt={5.5} ml={2} mb={2} flex={false}>
            <TVSection tvs={actor.tv_credits.cast} />
          </Box>

          <Box mt={5.5} ml={2} mb={2} flex={false}>
            <SectionB
              medias={movies}
              title="Movie"
              onPressMedia={handlePressMovie}
            />
          </Box>
        </>
      ) : (
        <Box color="transparent" middle>
          <ActivityIndicator />
        </Box>
      )}
    </ScrollView>
  );
};

export default ActorDetailScreen;
