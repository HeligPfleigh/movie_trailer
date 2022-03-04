import React from 'react';

import {
  Box,
  RecommendationCard,
  SectionHeader,
} from '@movie_trailer/components';
import {IMediaOverview} from '@movie_trailer/core/types';

interface ISectionBProps {
  medias: Array<Array<IMediaOverview>>;
  title?: string;
  onPressMedia?: (id: number) => void;
  onSeeAll?: () => void;
}

const SectionB: React.FC<ISectionBProps> = ({
  medias,
  title = 'Recommendation',
  onPressMedia,
  onSeeAll,
}: ISectionBProps) => {
  const handlePressMedia = (id: number) => () => onPressMedia?.(id);

  return (
    <>
      <SectionHeader title={title} onPress={onSeeAll} />

      {medias.map(group => {
        const [firstMedia, secondMedia] = group;
        return (
          <Box mb={2} key={firstMedia.id} row>
            <Box mr={1}>
              <RecommendationCard
                {...firstMedia}
                onPress={handlePressMedia(firstMedia.id)}
              />
            </Box>
            {secondMedia ? (
              <Box ml={1}>
                <RecommendationCard
                  {...secondMedia}
                  onPress={handlePressMedia(secondMedia.id)}
                />
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

export default SectionB;
