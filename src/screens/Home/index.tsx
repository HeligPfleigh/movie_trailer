import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {StyleSheet, ScrollView} from 'react-native';

import {colors, responsiveSize} from '@movie_trailer/theme';
import {Box, HomeBackground, Tabs} from '@movie_trailer/components';
import AppBar from './AppBar';
import SearchBox from './SearchBox';
import MovieTab from './MovieTab';
import TvShowTab from './TVShowTab';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {HomeScreenProps} from './types';
import {
  fetchMovieGenres,
  fetchTVShowGenres,
} from '@movie_trailer/store/slices/genreSlice';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.codGray,
  },
});

const tabs = [
  {value: 'movie', title: 'Movie'},
  {value: 'tv', title: 'TV Show'},
];

function HomeScreen({navigation, route}: HomeScreenProps) {
  const [activeTab, setActiveTab] = useState<string>('movie');
  const dispatch = useDispatch();

  useEffect(() => {
    setActiveTab(route.params.type);
  }, [route.params.type]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    dispatch(fetchMovieGenres());
    dispatch(fetchTVShowGenres());
  }, [dispatch]);

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const content = activeTab === 'tv' ? <TvShowTab /> : <MovieTab />;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HomeBackground height={responsiveSize(540)} />
      <SafeAreaView>
        <AppBar />
        <Box flex={false} ml={2} mr={2} mt={2.5}>
          <Tabs tabs={tabs} onTabChanged={setActiveTab} activeTab={activeTab} />
        </Box>

        <Box flex={false} ml={2} mr={2} mt={2.5}>
          <SearchBox onPress={handleOpenSearch} />
        </Box>

        {content}
      </SafeAreaView>
    </ScrollView>
  );
}

export default HomeScreen;
