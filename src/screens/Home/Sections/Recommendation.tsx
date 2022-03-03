import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {
  Box,
  RecommendationCard,
  SectionHeader,
} from '@movie_trailer/components';
import {IMediaOverview} from '@movie_trailer/core/types';
import {HomeNavigationProps} from '../types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';

interface IRecommendationProps {
  medias: Array<Array<IMediaOverview>>;
  type: 'tv' | 'movie';
}

const Recommendation: React.FC<IRecommendationProps> = ({
  medias,
  type,
}: IRecommendationProps) => {
  const navigation = useNavigation<HomeNavigationProps>();

  const handleSeeAll = () => {
    navigation.navigate(NavigatorMap.ListMedia, {
      type,
      subroute: 'top_rated',
    });
  };

  const handlePressMedia = (id: number) => () =>
    navigation.navigate(NavigatorMap.MediaDetail, {id, type});

  return (
    <>
      <SectionHeader title="Recommendation" onPress={handleSeeAll} />

      {medias.slice(0, 3).map(group => {
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

export default Recommendation;
