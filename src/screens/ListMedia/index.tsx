import React, {useCallback, useRef, useState} from 'react';

import {
  AppBar,
  Box,
  HomeBackground,
  RecommendationCard,
  Typography,
} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {ListMediaScreenProps} from './types';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadInitial,
  loadMore,
} from '@movie_trailer/store/slices/mediaListSlice';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {AppDispatch, RootState} from '@movie_trailer/store/rootReducer';
import {IMediaOverview} from '@movie_trailer/core/types';
import {useFocusEffect} from '@react-navigation/native';
import BasicNativeAdsView from '@movie_trailer/components/ads/BasicNativeAdsView';

const styles = StyleSheet.create({
  filterContainer: {
    borderBottomColor: 'rgba(255, 255, 255, 0.4)',
    borderBottomWidth: 1,
    marginHorizontal: spacing(2),
    marginBottom: spacing(3),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: spacing(1),
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: spacing(1),
    paddingHorizontal: spacing(1.5),
    borderRadius: responsiveSize(8),
  },
});

const ListMediaScreen: React.FC<ListMediaScreenProps> = ({
  navigation,
  route,
}: ListMediaScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {title, type, url} = route.params;
  const medias = useSelector(
    (state: RootState) => state.mediaList.data.results,
  );
  const totalResult = useSelector(
    (state: RootState) => state.mediaList.data.total_results,
  );
  const loading = useSelector((state: RootState) => state.mediaList.loading);
  const onEndReachedCalledDuringMomentumRef = useRef<boolean>(true);

  useFocusEffect(
    useCallback(() => {
      if (url) {
        dispatch(loadInitial({url}));
      }
    }, [url, dispatch]),
  );

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handlePressMedia = (id: number) => () =>
    navigation.push(NavigatorMap.MediaDetail, {id, type});

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentumRef.current) {
      dispatch(loadMore());
      onEndReachedCalledDuringMomentumRef.current = true;
    }
  };

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    if (url) {
      setRefreshing(true);
      dispatch(loadInitial({url})).then(() => setRefreshing(false));
    }
  }, [url, dispatch]);

  // const getItemLayout = (_data: unknown, index: number) => ({
  //   length: 230,
  //   offset: 230 * index,
  //   index,
  // });

  const renderItem = ({item, index}: {item: IMediaOverview; index: number}) => (
    <Box mr={index % 2 ? 0 : 1} mb={2} flex={0.5}>
      <RecommendationCard {...item} onPress={handlePressMedia(item.id)} />
    </Box>
  );

  const renderHeader = (
    <Box flex={false} mb={2}>
      <BasicNativeAdsView />
    </Box>
  );

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          {title ?? 'List Media'}
        </Typography>
      </Box>

      <Box flex={false} style={styles.filterContainer}>
        <Typography variant="caps1" color={colors.white}>
          {`${totalResult} item${totalResult !== 1 ? '(s)' : ''}`}
        </Typography>
      </Box>

      <Box ml={2} mr={2}>
        <FlatList
          data={medias}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          onMomentumScrollBegin={() => {
            onEndReachedCalledDuringMomentumRef.current = false;
          }}
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
          ListHeaderComponent={renderHeader}
          // removeClippedSubviews
          // initialNumToRender={10}
          // maxToRenderPerBatch={10}
          // updateCellsBatchingPeriod={30}
          // windowSize={10}
          // getItemLayout={getItemLayout}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Box>
    </Box>
  );
};

export default ListMediaScreen;
