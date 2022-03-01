import React, {useEffect} from 'react';

import {
  AppBar,
  Box,
  HomeBackground,
  RecommendationCard,
  Typography,
} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {ListMediaScreenProps} from './types';
import {useListMediaHeader} from './useListMediaHeader';
import {useDispatch, useSelector} from 'react-redux';
import {loadInitialMediaList} from '@movie_trailer/store/slices/mediaListSlice';
import {FlatList} from 'react-native';
import {RootState} from '@movie_trailer/store/rootReducer';
import {IMediaOverview} from '@movie_trailer/core/types';

const ListMediaScreen: React.FC<ListMediaScreenProps> = ({
  navigation,
  route,
}: ListMediaScreenProps) => {
  const header = useListMediaHeader();
  const dispatch = useDispatch();
  const {subroute, type, with_genres} = route.params;
  const medias = useSelector((state: RootState) => state.mediaList.results);

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
