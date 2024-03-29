import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {
  AppBar,
  Box,
  FilterPopup,
  HomeBackground,
  RecommendationCard,
  Typography,
} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {DiscoverScreenProps} from './types';
import {useHeader} from './useHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  ActivityIndicator,
  FlatList,
  LayoutChangeEvent,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AppDispatch, RootState} from '@movie_trailer/store/rootReducer';
import {IMediaOverview} from '@movie_trailer/core/types';
import Filter from '@movie_trailer/assets/icons/Filter';
import ArrowDown from '@movie_trailer/assets/icons/ArrowDown';
import {loadInitial, loadMore} from '@movie_trailer/store/slices/discoverSlice';
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

const DiscoverScreen: React.FC<DiscoverScreenProps> = ({
  navigation,
  route,
}: DiscoverScreenProps) => {
  const header = useHeader();
  const dispatch = useDispatch<AppDispatch>();
  const {type, with_genres} = route.params;
  const medias = useSelector((state: RootState) => state.discover.data.results);
  const totalResult = useSelector(
    (state: RootState) => state.discover.data.total_results,
  );
  const loading = useSelector((state: RootState) => state.discover.loading);

  const onEndReachedCalledDuringMomentumRef = useRef<boolean>(true);
  const [filterMode, setFilterMode] = useState<
    'rating.desc' | 'title.desc' | 'title.asc'
  >();

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handlePressMedia = (id: number) => () =>
    navigation.push(NavigatorMap.MediaDetail, {id, type});

  const sortBy = useMemo(() => {
    if (filterMode === 'rating.desc') {
      return 'vote_average.desc';
    }

    if (filterMode === 'title.desc' && type === 'movie') {
      return 'title.desc';
    }

    if (filterMode === 'title.desc' && type === 'tv') {
      return 'name.desc';
    }

    if (filterMode === 'title.asc' && type === 'movie') {
      return 'title.asc';
    }

    if (filterMode === 'title.asc' && type === 'tv') {
      return 'name.asc';
    }

    return undefined;
  }, [filterMode, type]);

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(
      loadInitial({
        type,
        genre: with_genres,
        sortBy,
      }),
    ).then(() => setRefreshing(false));
  }, [type, with_genres, dispatch, sortBy]);

  useEffect(() => {
    dispatch(
      loadInitial({
        type,
        genre: with_genres,
        sortBy,
      }),
    );
  }, [type, with_genres, dispatch, sortBy]);

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentumRef.current) {
      dispatch(loadMore());
      onEndReachedCalledDuringMomentumRef.current = true;
    }
  };

  // const getItemLayout = (_data: unknown, index: number) => ({
  //   length: 230,
  //   offset: 230 * index,
  //   index,
  // });

  const renderItem = ({item, index}: {item: IMediaOverview; index: number}) => (
    <Box mr={index % 2 ? 0 : 1} mb={2}>
      <RecommendationCard {...item} onPress={handlePressMedia(item.id)} />
    </Box>
  );

  const renderHeader = (
    <Box flex={false} mb={2}>
      <BasicNativeAdsView />
    </Box>
  );

  const [filterPosition, setFilterPosition] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const toggleFilter = () => setOpenFilter(prev => !prev);

  const handleSelectFilter = (
    filter: 'rating.desc' | 'title.desc' | 'title.asc',
  ) =>
    setFilterMode(prev => {
      if (prev === filter) {
        return undefined;
      }
      return filter;
    });

  const handleLayout = (event: LayoutChangeEvent) => {
    setFilterPosition(event.nativeEvent.layout.y + 64);
  };

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          {header}
        </Typography>
      </Box>

      <Box flex={false} style={styles.filterContainer} onLayout={handleLayout}>
        <Typography variant="caps1" color={colors.white}>
          {`${totalResult} item${totalResult !== 1 ? '(s)' : ''}`}
        </Typography>

        <TouchableOpacity style={styles.filterBtn} onPress={toggleFilter}>
          <Filter />
          <Box flex={false} ml={1} mr={1}>
            <Typography variant="caps1" color={colors.white}>
              Filter
            </Typography>
          </Box>
          <ArrowDown />
        </TouchableOpacity>
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

      <FilterPopup
        open={openFilter}
        top={filterPosition}
        onClose={toggleFilter}
        selected={filterMode}
        onSelectFilter={handleSelectFilter}
      />
    </Box>
  );
};

export default DiscoverScreen;
