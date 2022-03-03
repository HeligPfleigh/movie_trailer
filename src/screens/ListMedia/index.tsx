import React, {useEffect, useMemo, useRef} from 'react';

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
  loadInitialMediaList,
  loadMore,
} from '@movie_trailer/store/slices/mediaListSlice';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import {RootState} from '@movie_trailer/store/rootReducer';
import {IMediaOverview} from '@movie_trailer/core/types';

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
  const dispatch = useDispatch();
  const {subroute, type} = route.params;
  const medias = useSelector((state: RootState) => state.mediaList.results);
  const totalResult = useSelector(
    (state: RootState) => state.mediaList.total_results,
  );
  const currentPage = useSelector((state: RootState) => state.mediaList.page);
  const totalPage = useSelector(
    (state: RootState) => state.mediaList.total_pages,
  );
  const onEndReachedCalledDuringMomentumRef = useRef<boolean>(true);

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handlePressMedia = (id: number) => () =>
    navigation.navigate(NavigatorMap.MediaDetail, {id, type});

  useEffect(() => {
    dispatch(
      loadInitialMediaList({
        type,
        subroute,
      }),
    );
  }, [subroute, type, dispatch]);

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
            page: currentPage + 1,
          },
        }),
      );
      onEndReachedCalledDuringMomentumRef.current = true;
    }
  };

  const getItemLayout = (_data: unknown, index: number) => ({
    length: 230,
    offset: 230 * index,
    index,
  });

  const renderItem = ({item, index}: {item: IMediaOverview; index: number}) => (
    <Box mr={index % 2 ? 0 : 1} mb={2}>
      <RecommendationCard {...item} onPress={handlePressMedia(item.id)} />
    </Box>
  );

  const header = useMemo(() => {
    if (subroute === 'airing_today' || subroute === 'now_playing') {
      return 'Today';
    }

    if (subroute === 'upcoming') {
      return 'Upcoming';
    }

    if (subroute === 'top_rated') {
      return 'Recommendation';
    }

    return 'List Media';
  }, [subroute]);

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography variant="h4" color={colors.white} fontWeight="600">
          {header}
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
    </Box>
  );
};

export default ListMediaScreen;
