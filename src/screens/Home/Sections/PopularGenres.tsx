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
  type: 'movie' | 'tvShow';
}

const PopularGenres: React.FC<IPopularGenresProps> = ({
  genres,
  type,
}: IPopularGenresProps) => {
  const navigation = useNavigation<HomeNavigationProps>();

  const renderItem = ({item}: {item: string}) => (
    <Box mr={2}>
      <GenreCard name={item} />
    </Box>
  );

  const handlePressSeeAll = () =>
    navigation.navigate(NavigatorMap.Genre, {type});

  return (
    <>
      <SectionHeader title="Popular Genres" onPress={handlePressSeeAll} />

      <FlatList
        data={genres.map(item => item.name)}
        renderItem={renderItem}
        keyExtractor={item => `${item}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default PopularGenres;
