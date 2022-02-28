import React from 'react';

import {Box, RecommendationCard} from '@movie_trailer/components';
import SectionHeader from './SectionHeader';
import {IMediaOverview} from '@movie_trailer/core/types';

interface IRecommendationProps {
  medias: Array<Array<IMediaOverview>>;
}

const Recommendation: React.FC<IRecommendationProps> = ({
  medias,
}: IRecommendationProps) => {
  return (
    <>
      <SectionHeader title="Recommendation" />

      {medias.map(group => {
        const [firstMedia, secondMedia] = group;
        return (
          <Box mb={2} key={firstMedia.id} row>
            <Box mr={1}>
              <RecommendationCard {...firstMedia} />
            </Box>
            {secondMedia ? (
              <Box ml={1}>
                <RecommendationCard {...secondMedia} />
              </Box>
            ) : (
              <Box ml={1} />
            )}
          </Box>
        );
      })}
    </>
  );
};

export default Recommendation;
