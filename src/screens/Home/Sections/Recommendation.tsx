import React from 'react';
import {FlatList} from 'react-native';

import {Box, RecommendationCard} from '@movie_trailer/components';
import SectionHeader from './SectionHeader';
import {IMediaItem} from '@movie_trailer/core/types';

interface IRecommendationProps {
  medias: Array<IMediaItem>;
}

const Recommendation: React.FC<IRecommendationProps> = ({
  medias,
}: IRecommendationProps) => {
  const renderItem = ({item, index}: {item: IMediaItem; index: number}) => (
    <Box mr={index % 2 ? 0 : 1} mb={2}>
      <RecommendationCard {...item} />
    </Box>
  );

  return (
    <>
      <SectionHeader title="Recommendation" />

      {/** TODO: remove flatlist */}
      <FlatList
        data={medias}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        numColumns={2}
      />
    </>
  );
};

export default Recommendation;
