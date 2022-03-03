import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {DrawerScreenProps} from '@react-navigation/drawer';

import {
  AppBar,
  Box,
  GenreCard,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {RootState} from '@movie_trailer/store/rootReducer';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {CompositeScreenProps} from '@react-navigation/native';
import {IGenre} from '@movie_trailer/core/types';

type GenreScreenNavigationProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.Genre>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

const GenreScreen: React.FC<GenreScreenNavigationProps> = ({
  navigation,
  route,
}: GenreScreenNavigationProps) => {
  const movieGenres = useSelector(
    (state: RootState) => state.genre.movieGenres,
  );
  const tvGenres = useSelector((state: RootState) => state.genre.tvGenres);
  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handleSelectGenre = (genre: IGenre) => {
    const {type} = route.params;
    navigation.navigate(NavigatorMap.Discover, {
      type,
      with_genres: genre.id,
    });
  };

  const renderItem = ({item, index}: {item: IGenre; index: number}) => (
    <Box mr={2} mb={2} ml={index % 3 ? 0 : 2}>
      <GenreCard genre={item} onPress={() => handleSelectGenre(item)} />
    </Box>
  );

  const title = route.params.type === 'tv' ? 'TV Show Genres' : 'Movie Genres';
  const genres = route.params.type === 'tv' ? tvGenres : movieGenres;

  const renderListHeader = () => (
    <>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography variant="h4" color={colors.white} fontWeight="600">
          {title}
        </Typography>
      </Box>
    </>
  );

  return (
    <FlatList
      style={{backgroundColor: colors.codGray}}
      ListHeaderComponent={renderListHeader}
      data={genres}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}`}
      numColumns={3}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default GenreScreen;
