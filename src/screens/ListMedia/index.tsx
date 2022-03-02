import React, {useEffect, useMemo, useRef, useState} from 'react';

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
import {ListMediaScreenProps} from './types';
import {useListMediaHeader} from './useListMediaHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  loadInitialMediaList,
  loadMore,
} from '@movie_trailer/store/slices/mediaListSlice';
import {
  ActivityIndicator,
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {RootState} from '@movie_trailer/store/rootReducer';
import {IMediaOverview} from '@movie_trailer/core/types';
import Filter from '@movie_trailer/assets/icons/Filter';
import ArrowDown from '@movie_trailer/assets/icons/ArrowDown';

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
  const header = useListMediaHeader();
  const dispatch = useDispatch();
  const {subroute, type, with_genres} = route.params;
  const medias = useSelector((state: RootState) => state.mediaList.results);
  const totalResult = useSelector(
    (state: RootState) => state.mediaList.total_results,
  );
  const currentPage = useSelector((state: RootState) => state.mediaList.page);
  const totalPage = useSelector(
    (state: RootState) => state.mediaList.total_pages,
  );
  const onEndReachedCalledDuringMomentumRef = useRef<boolean>(true);
  const [filterMode, setFilterMode] = useState<
    'rating.desc' | 'title.desc' | 'title.asc'
  >('title.asc');

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const sortBy = useMemo(() => {
    if (filterMode === 'rating.desc') {
      return 'vote_average.asc';
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
  }, [filterMode, type]);

  useEffect(() => {
    const params = {with_genres, sort_by: sortBy};
    dispatch(
      loadInitialMediaList({
        type,
        subroute,
        params,
      }),
    );
  }, [subroute, type, with_genres, dispatch, sortBy]);

  const handleLoadMore = () => {
    if (
      !onEndReachedCalledDuringMomentumRef.current &&
      currentPage < totalPage
    ) {
      dispatch(
        loadMore({
          type,
          subroute,
          params: {
            with_genres,
            page: currentPage + 1,
            sort_by: sortBy,
          },
        }),
      );
    }
  };

  const getItemLayout = (_data: unknown, index: number) => ({
    length: 230,
    offset: 230 * index,
    index,
  });

  const renderItem = ({item, index}: {item: IMediaOverview; index: number}) => (
    <Box mr={index % 2 ? 0 : 1} mb={2}>
      <RecommendationCard {...item} />
    </Box>
  );

  const [filterPosition, setFilterPosition] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const toggleFilter = () => {
    setOpenFilter(prev => !prev);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    setFilterPosition(event.nativeEvent.layout.y + 64);
  };

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography variant="h4" color={colors.white} fontWeight="600">
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
          ListFooterComponent={
            currentPage < totalPage ? <ActivityIndicator /> : null
          }
          removeClippedSubviews
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          updateCellsBatchingPeriod={30}
          windowSize={10}
          getItemLayout={getItemLayout}
        />
      </Box>

      <FilterPopup
        open={openFilter}
        top={filterPosition}
        onClose={toggleFilter}
        selected={filterMode}
        onSelectFilter={setFilterMode}
      />
    </Box>
  );
};

export default ListMediaScreen;
