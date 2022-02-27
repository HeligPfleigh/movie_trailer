import React from 'react';
import {FlatList} from 'react-native';

import {Box, RecommendationCard} from '@movie_trailer/components';
import SectionHeader from './SectionHeader';
import {IRecommendationMediaItem} from '@movie_trailer/core/types';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';

interface IRecommendationProps {
  medias: Array<IRecommendationMediaItem>;
}

const Recommendation: React.FC<IRecommendationProps> = ({
  medias,
}: IRecommendationProps) => {
  const renderItem = ({
    item,
    index,
  }: {
    item: IRecommendationMediaItem;
    index: number;
  }) => (
    <Box mr={index % 2 ? 0 : 1} mb={2}>
      <RecommendationCard
        title={item.title}
        poster={`${IMAGE_SERVER}${item.poster}`}
        rating={item.rating}
        genres={item.genres}
        time={item.time}
      />
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
