import React from 'react';
import {FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Box, GenreCard} from '@movie_trailer/components';
import SectionHeader from './SectionHeader';
import {IGenre} from '@movie_trailer/core/types';
import {HomeNavigationProps} from '../types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';

interface IPopularGenresProps {
  genres: IGenre[];
  type: 'movie' | 'tv';
}

const PopularGenres: React.FC<IPopularGenresProps> = ({
  genres,
  type,
}: IPopularGenresProps) => {
  const navigation = useNavigation<HomeNavigationProps>();

  const handleSelectGenre = (genre: IGenre) => {
    navigation.navigate(NavigatorMap.ListMedia, {
      type,
      subroute: 'top_rated',
      with_genres: genre.id,
    });
  };

  const renderItem = ({item}: {item: IGenre}) => (
    <Box mr={2}>
      <GenreCard genre={item} onPress={() => handleSelectGenre(item)} />
    </Box>
  );

  const handlePressSeeAll = () =>
    navigation.navigate(NavigatorMap.Genre, {type});

  return (
    <>
      <SectionHeader title="Popular Genres" onPress={handlePressSeeAll} />

      <FlatList
        data={genres}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default PopularGenres;
