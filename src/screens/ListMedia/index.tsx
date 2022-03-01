import React, {useEffect} from 'react';

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
import {useListMediaHeader} from './useListMediaHeader';
import {useDispatch, useSelector} from 'react-redux';
import {loadInitialMediaList} from '@movie_trailer/store/slices/mediaListSlice';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
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

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  useEffect(() => {
    const params = with_genres ? {with_genres} : {};
    dispatch(
      loadInitialMediaList({
        type,
        subroute,
        params,
      }),
    );
  }, [subroute, type, with_genres, dispatch]);

  const renderItem = ({item, index}: {item: IMediaOverview; index: number}) => (
    <Box mr={index % 2 ? 0 : 1} mb={2}>
      <RecommendationCard {...item} />
    </Box>
  );

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

        <TouchableOpacity style={styles.filterBtn}>
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
        />
      </Box>
    </Box>
  );
};

export default ListMediaScreen;
