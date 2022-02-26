import {Box, GenreCard} from '@movie_trailer/components';
import React from 'react';
import {FlatList} from 'react-native';
import SectionHeader from './SectionHeader';

const PopularGenres: React.FC = () => {
  const renderItem = () => (
    <Box mr={2}>
      <GenreCard name="demo" />
    </Box>
  );

  return (
    <>
      <SectionHeader title="Popular Genres" />

      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={renderItem}
        keyExtractor={item => `${item}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default PopularGenres;
