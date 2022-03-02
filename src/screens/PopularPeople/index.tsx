import ArrowDown from '@movie_trailer/assets/icons/ArrowDown';
import Filter from '@movie_trailer/assets/icons/Filter';
import {
  AppBar,
  Box,
  FilterPopup,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import ActorSearchCard from '@movie_trailer/components/share/ActorSearchCard';
import {IActorOverview} from '@movie_trailer/core/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {RootState} from '@movie_trailer/store/rootReducer';
import {
  loadInitial,
  loadMore,
} from '@movie_trailer/store/slices/popularPeopleSlice';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PopularPeopleScreenProps} from './types';

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

const PopularPeopleScreen: React.FC<PopularPeopleScreenProps> = ({
  navigation,
}: PopularPeopleScreenProps) => {
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);
  const dispatch = useDispatch();
  const totalResult = useSelector(
    (state: RootState) => state.popularPeople.total_results,
  );
  const currentPage = useSelector(
    (state: RootState) => state.popularPeople.page,
  );
  const totalPage = useSelector(
    (state: RootState) => state.popularPeople.total_pages,
  );
  const people = useSelector((state: RootState) => state.popularPeople.results);
  const [filterMode, setFilterMode] = useState<
    'rating.desc' | 'title.desc' | 'title.asc'
  >('title.asc');
  const onEndReachedCalledDuringMomentumRef = useRef<boolean>(true);

  const renderItem = ({item}: {item: IActorOverview}) => (
    <ActorSearchCard {...item} />
  );

  useEffect(() => {
    dispatch(loadInitial({}));
  }, [dispatch]);

  const [filterPosition, setFilterPosition] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<boolean>(false);

  const toggleFilter = () => {
    setOpenFilter(prev => !prev);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    setFilterPosition(event.nativeEvent.layout.y + 64);
  };

  const handleLoadMore = () => {
    if (
      !onEndReachedCalledDuringMomentumRef.current &&
      currentPage < totalPage
    ) {
      dispatch(
        loadMore({
          params: {
            page: currentPage + 1,
          },
        }),
      );
      onEndReachedCalledDuringMomentumRef.current = true;
    }
  };

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography variant="h4" color={colors.white} fontWeight="600">
          Popular People
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

      <FlatList
        data={people}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          onEndReachedCalledDuringMomentumRef.current = false;
        }}
        ListFooterComponent={
          currentPage < totalPage ? <ActivityIndicator /> : null
        }
      />

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

export default PopularPeopleScreen;
