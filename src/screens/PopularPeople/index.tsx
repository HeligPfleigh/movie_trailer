import {
  AppBar,
  Box,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import ActorSearchCard from '@movie_trailer/components/share/ActorSearchCard';
import {IActorOverview} from '@movie_trailer/core/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {RootState} from '@movie_trailer/store/rootReducer';
import {popularPeopleSelector} from '@movie_trailer/store/selectors/popularPeople';
import {togglePersonFavorite} from '@movie_trailer/store/slices/favoriteSlice';
import {loadMore} from '@movie_trailer/store/slices/popularPeopleSlice';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React, {useRef} from 'react';
import {ActivityIndicator, FlatList, StyleSheet} from 'react-native';
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
  route,
}: PopularPeopleScreenProps) => {
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);
  const dispatch = useDispatch();
  const totalResult = useSelector(
    (state: RootState) => state.popularPeople.data.total_results,
  );
  const loading = useSelector(
    (state: RootState) => state.popularPeople.loading,
  );
  const people = useSelector(popularPeopleSelector);
  const onEndReachedCalledDuringMomentumRef = useRef<boolean>(true);
  const {title} = route.params;

  const handleNavigateToActorDetail = (id: number) => () =>
    navigation.navigate(NavigatorMap.ActorDetail, {id});

  const handleToggleFavorite = (actor: IActorOverview) => () => {
    dispatch(togglePersonFavorite(actor));
  };

  const renderItem = ({item}: {item: IActorOverview}) => (
    <ActorSearchCard
      {...item}
      onPress={handleNavigateToActorDetail(item.id)}
      onPressFavorite={handleToggleFavorite(item)}
    />
  );

  const handleLoadMore = () => {
    if (!onEndReachedCalledDuringMomentumRef.current) {
      dispatch(loadMore());
      onEndReachedCalledDuringMomentumRef.current = true;
    }
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
          {title || 'Popular People'}
        </Typography>
      </Box>

      <Box flex={false} style={styles.filterContainer}>
        <Typography variant="caps1" color={colors.white}>
          {`${totalResult} item${totalResult !== 1 ? '(s)' : ''}`}
        </Typography>
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
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
      />
    </Box>
  );
};

export default PopularPeopleScreen;
