import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, StyleSheet} from 'react-native';

import {Box, MediaSearchCard, Tabs} from '@movie_trailer/components';
import {RootState} from '@movie_trailer/store/rootReducer';
import {setActiveSearchTab} from '@movie_trailer/store/slices/searchSlice';
import {spacing} from '@movie_trailer/theme';
import {
  movieSearchResultSelector,
  tvSearchResultSelector,
} from '@movie_trailer/store/selectors/search';
import {IMediaOverview} from '@movie_trailer/core/types';
import NoResult from './NoResult';
import {SearchNavigationProps} from '../types';
import {useNavigation} from '@react-navigation/native';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {ISelfieFrameType} from '@movie_trailer/core/constants';
import BasicNativeAdsView from '@movie_trailer/components/ads/BasicNativeAdsView';

const tabs = [
  {value: 'movie' as const, title: 'Movie'},
  {value: 'tv' as const, title: 'TV Show'},
];

const isMedia = (item: 'movie' | 'tv' | 'person'): item is 'movie' | 'tv' => {
  return ['movie', 'tv'].includes(item);
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: spacing(35),
  },
});

interface ISelfieSearchProps {
  searchText?: string;
  selfieMode: ISelfieFrameType;
}

const SelfieSearch: React.FC<ISelfieSearchProps> = ({
  searchText,
  selfieMode,
}: ISelfieSearchProps) => {
  const pActiveTab = useSelector(
    (state: RootState) => state.search.activeSearchTab,
  );
  const activeTab = isMedia(pActiveTab) ? pActiveTab : 'movie';
  const dispatch = useDispatch();
  const movies = useSelector(movieSearchResultSelector);
  const tvShows = useSelector(tvSearchResultSelector);
  const navigation = useNavigation<SearchNavigationProps>();

  const handleTabChanged = (tab: 'movie' | 'tv') => {
    dispatch(setActiveSearchTab(tab));
  };

  const handleNavigateToTakePhotoScreen = (item: IMediaOverview) => () => {
    navigation.navigate(NavigatorMap.Home, {
      screen: NavigatorMap.SelfieCamera,
      params: {
        media: item,
        selfieMode,
      },
    });
  };

  const renderItem = ({item}: {item: IMediaOverview}) => (
    <MediaSearchCard
      {...item}
      onPress={handleNavigateToTakePhotoScreen(item)}
    />
  );

  const renderHeader = (
    <Box flex={false} m={2}>
      <BasicNativeAdsView />
    </Box>
  );

  // if (!searchText) {
  //   return null;
  // }

  const medias = activeTab === 'tv' ? tvShows : movies;
  return (
    <Box flex={false} ml={2} mb={3}>
      <Box flex={false} ml={2} mb={3}>
        <Tabs
          tabs={tabs}
          onTabChanged={handleTabChanged}
          activeTab={activeTab}
        />
      </Box>

      <FlatList
        data={medias}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        ListEmptyComponent={<NoResult searchText={searchText} />}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.list}
      />
    </Box>
  );
};

export default SelfieSearch;
