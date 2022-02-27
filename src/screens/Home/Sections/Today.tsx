import {Box, MovieCard} from '@movie_trailer/components';
import {IMediaItem} from '@movie_trailer/core/types';
import React from 'react';
import {FlatList} from 'react-native';

import SectionHeader from './SectionHeader';

interface ITodayProps {
  medias: Array<IMediaItem>;
}

// TODO: progress of scroll

const Today: React.FC<ITodayProps> = ({medias}: ITodayProps) => {
  const renderItem = ({item}: {item: IMediaItem}) => (
    <Box mr={2}>
      <MovieCard {...item} />
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
