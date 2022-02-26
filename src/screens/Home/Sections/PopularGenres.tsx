import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import {Box, GenreCard} from '@movie_trailer/components';
import {RootState} from '@movie_trailer/store/rootReducer';
import SectionHeader from './SectionHeader';

const PopularGenres: React.FC = () => {
  const genres = useSelector((state: RootState) => state.genre.movieGenres);

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
