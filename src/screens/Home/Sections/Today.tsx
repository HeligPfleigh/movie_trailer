import {Box, MovieCard} from '@movie_trailer/components';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {ITodayMediaItem} from '@movie_trailer/core/types';
import React from 'react';
import {FlatList} from 'react-native';

import SectionHeader from './SectionHeader';

interface ITodayProps {
  medias: Array<ITodayMediaItem>;
}

// TODO: progress of scroll

const Today: React.FC<ITodayProps> = ({medias}: ITodayProps) => {
  const renderItem = ({item}: {item: ITodayMediaItem}) => (
    <Box mr={2}>
      <MovieCard
        title={item.title}
        poster={`${IMAGE_SERVER}${item.poster}`}
        rating={item.rating}
        genres={item.genres}
      />
    </Box>
  );

  return (
    <>
      <SectionHeader title="Today" />

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

export default Today;
