import {Box, MovieCard, SectionHeader} from '@movie_trailer/components';
import {IMediaOverview} from '@movie_trailer/core/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {loadInitial} from '@movie_trailer/store/slices/mediaListSlice';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {HomeNavigationProps} from '../types';

interface ITodayProps {
  medias: Array<IMediaOverview>;
  type: 'movie' | 'tv';
}

// TODO: progress of scroll

const Today: React.FC<ITodayProps> = ({medias, type}: ITodayProps) => {
  const navigation = useNavigation<HomeNavigationProps>();
  const dispatch = useDispatch();

  const handlePressMedia = (id: number) => () =>
    navigation.navigate(NavigatorMap.MediaDetail, {id, type});

  const renderItem = ({item}: {item: IMediaOverview}) => (
    <Box mr={2}>
      <MovieCard {...item} onPress={handlePressMedia(item.id)} />
    </Box>
  );

  const handleSeeAll = () => {
    dispatch(
      loadInitial({
        url: `${type}/${type === 'movie' ? 'now_playing' : 'airing_today'}`,
      }),
    );

    navigation.push(NavigatorMap.ListMedia, {
      type,
      title: 'Today',
    });
  };

  return (
    <>
      <SectionHeader title="Today" onPress={handleSeeAll} />

      <FlatList
        data={medias.slice(0, 5)}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default Today;
