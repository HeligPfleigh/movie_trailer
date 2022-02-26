import {Box, MovieCard} from '@movie_trailer/components';
import React from 'react';
import {FlatList} from 'react-native';

import SectionHeader from './SectionHeader';

const Today: React.FC = () => {
  const renderItem = () => (
    <Box mr={2}>
      <MovieCard />
    </Box>
  );

  return (
    <>
      <SectionHeader title="Today" />

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

export default Today;
