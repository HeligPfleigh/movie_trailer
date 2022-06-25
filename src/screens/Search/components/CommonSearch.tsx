import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {Box, MediaSearchCard, Tabs} from '@movie_trailer/components';
import ActorSearchCard from '@movie_trailer/components/share/ActorSearchCard';
import {IActorOverview, IMediaOverview} from '@movie_trailer/core/types';
import {
  actorSearchResultSelector,
  movieSearchResultSelector,
  tvSearchResultSelector,
} from '@movie_trailer/store/selectors/search';
import {setActiveSearchTab} from '@movie_trailer/store/slices/searchSlice';
import {spacing} from '@movie_trailer/theme';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {togglePersonFavorite} from '@movie_trailer/store/slices/favoriteSlice';
import {SearchNavigationProps} from '../types';
import {RootState} from '@movie_trailer/store/rootReducer';
import NoResult from './NoResult';

interface ICommonSearchProps {
  searchText?: string;
}

const tabs = [
  {value: 'movie' as const, title: 'Movie'},
  {value: 'tv' as const, title: 'TV Show'},
  {value: 'person' as const, title: 'Actor'},
];

const styles = StyleSheet.create({
  list: {
    paddingBottom: spacing(35),
  },
});

const CommonSearch: React.FC<ICommonSearchProps> = ({
  searchText,
}: ICommonSearchProps) => {
  const activeTab = useSelector(
    (state: RootState) => state.search.activeSearchTab,
  );
  const movies = useSelector(movieSearchResultSelector);
  const tvShows = useSelector(tvSearchResultSelector);
  const actors = useSelector(actorSearchResultSelector);
  const dispatch = useDispatch();
  const navigation = useNavigation<SearchNavigationProps>();

  const handleTabChanged = (tab: 'movie' | 'tv' | 'person') => {
    dispatch(setActiveSearchTab(tab));
  };

  const handleNavigateToMediaDetail = (id: number) => () => {
    if (activeTab !== 'person') {
      navigation.navigate(NavigatorMap.Home, {
        screen: NavigatorMap.MediaDetail,
        params: {id, type: activeTab},
      });
    }
  };

  const renderItem = ({item}: {item: IMediaOverview}) => (
    <MediaSearchCard {...item} onPress={handleNavigateToMediaDetail(item.id)} />
  );

  const handleNavigateToActorDetail = (id: number) => () =>
    navigation.navigate(NavigatorMap.Home, {
      screen: NavigatorMap.ActorDetail,
      params: {id},
    });

  const handleToggleFavorite = (actor: IActorOverview) => () => {
    dispatch(togglePersonFavorite(actor));
  };

  const renderActorItem = ({item}: {item: IActorOverview}) => (
    <ActorSearchCard
      {...item}
      onPress={handleNavigateToActorDetail(item.id)}
      onPressFavorite={handleToggleFavorite(item)}
    />
  );

  if (!searchText) {
    return null;
  }

  const medias =
    activeTab === 'movie' ? movies : activeTab === 'tv' ? tvShows : [];

  return (
    <>
      <Box flex={false} ml={2} mb={3}>
        <Tabs
          tabs={tabs}
          onTabChanged={handleTabChanged}
          activeTab={activeTab ?? 'movie'}
        />
      </Box>

      {['tv', 'movie'].includes(activeTab ?? '') && (
        <FlatList
          data={medias}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={<NoResult searchText={searchText} />}
          contentContainerStyle={styles.list}
        />
      )}

      {activeTab === 'person' && (
        <FlatList
          data={actors}
          renderItem={renderActorItem}
          keyExtractor={item => `${item.id}`}
          ListEmptyComponent={<NoResult searchText={searchText} />}
          contentContainerStyle={styles.list}
        />
      )}
    </>
  );
};

export default CommonSearch;
