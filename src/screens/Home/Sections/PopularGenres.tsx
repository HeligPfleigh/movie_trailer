import React from 'react';
import {FlatList} from 'react-native';

import {Box, GenreCard} from '@movie_trailer/components';
import SectionHeader from './SectionHeader';
import {IGenre} from '@movie_trailer/core/types';

interface IPopularGenresProps {
  genres: IGenre[];
}

const PopularGenres: React.FC<IPopularGenresProps> = ({
  genres,
}: IPopularGenresProps) => {
  const renderItem = ({item}: {item: string}) => (
    <Box mr={2}>
      <GenreCard name={item} />
    </Box>
  );

  return (
    <>
      <SectionHeader title="Popular Genres" />

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
