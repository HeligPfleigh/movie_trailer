import {Box, MovieCard} from '@movie_trailer/components';
import {IMediaOverview} from '@movie_trailer/core/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList} from 'react-native';
import {HomeNavigationProps} from '../types';

import SectionHeader from './SectionHeader';

interface ITodayProps {
  medias: Array<IMediaOverview>;
  type: 'movie' | 'tv';
}

// TODO: progress of scroll

const Today: React.FC<ITodayProps> = ({medias, type}: ITodayProps) => {
  const renderItem = ({item}: {item: IMediaOverview}) => (
    <Box mr={2}>
      <MovieCard {...item} />
    </Box>
  );

  const navigation = useNavigation<HomeNavigationProps>();

  const handleSeeAll = () => {
    navigation.navigate(NavigatorMap.ListMedia, {
      type,
      subroute: type === 'movie' ? 'now_playing' : 'aring_today',
    });
  };

  return (
    <>
      <SectionHeader title="Today" onPress={handleSeeAll} />

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
