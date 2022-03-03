import {Box, MovieCard, SectionHeader} from '@movie_trailer/components';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {IMediaOverview, ITVOverview} from '@movie_trailer/core/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {RootState} from '@movie_trailer/store/rootReducer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {ActorDetailNavigationProps} from './types';

interface ITVSectionProps {
  tvs: Array<ITVOverview>;
}

const TVSection: React.FC<ITVSectionProps> = ({tvs}: ITVSectionProps) => {
  const genres = useSelector((state: RootState) => state.genre.tvGenres);
  const navigation = useNavigation<ActorDetailNavigationProps>();

  const handlePressMedia = (id: number) => () =>
    navigation.navigate(NavigatorMap.MediaDetail, {id, type: 'tv'});

  const renderItem = ({item}: {item: IMediaOverview}) => (
    <Box mr={2}>
      <MovieCard {...item} onPress={handlePressMedia(item.id)} />
    </Box>
  );

  const medias = tvs.map(show => {
    const genre = genres
      .filter(item => show.genre_ids.includes(item.id))
      .map(item => item.name)
      .join('/ ');

    return {
      id: show.id,
      title: show.name,
      genres: genre,
      poster: `${IMAGE_SERVER}${show.poster_path}`,
      rating: show.vote_average,
      time: show.first_air_date,
    };
  });

  return (
    <>
      <SectionHeader title="TV Show" />

      <FlatList
        data={medias}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default TVSection;
