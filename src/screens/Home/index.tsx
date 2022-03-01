import React, {useEffect, useState} from 'react';

import {colors, responsiveSize} from '@movie_trailer/theme';
import {Box, HomeBackground, Tabs} from '@movie_trailer/components';
import AppBar from './AppBar';
import SearchBox from './SearchBox';
import {StyleSheet, ScrollView} from 'react-native';
import MovieTab from './MovieTab';
import TvShowTab from './TVShowTab';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {HomeScreenProps} from './types';

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

  useEffect(() => {
    setActiveTab(route.params.type);
  }, [route.params.type]);

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const content = activeTab === 'tv' ? <TvShowTab /> : <MovieTab />;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HomeBackground height={responsiveSize(540)} />
      <AppBar />
      <Box flex={false} ml={2} mr={2} mt={2.5}>
        <Tabs tabs={tabs} onTabChanged={setActiveTab} activeTab={activeTab} />
      </Box>

      <Box flex={false} ml={2} mr={2} mt={2.5}>
        <SearchBox onPress={handleOpenSearch} />
      </Box>

      {content}
    </ScrollView>
  );
}

export default HomeScreen;
