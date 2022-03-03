import React from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

import {Box, SectionHeader} from '@movie_trailer/components';
import {IMovieOverview} from '@movie_trailer/core/types';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {responsiveSize, spacing} from '@movie_trailer/theme';
import {upcomingMoviesSelector} from '@movie_trailer/store/selectors/movie';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigationProps} from '../types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';

const styles = StyleSheet.create({
  singleImage: {
    width: responsiveSize(132),
    height: responsiveSize(208),
    borderRadius: responsiveSize(8),
  },
  multiImage: {
    width: responsiveSize(132),
    height: responsiveSize(100),
    borderRadius: responsiveSize(8),
  },
  firstImage: {
    marginBottom: spacing(1),
  },
});

const Upcoming: React.FC = () => {
  const movies = useSelector(upcomingMoviesSelector);

  const navigation = useNavigation<HomeNavigationProps>();

  const handleSeeAll = () => {
    navigation.navigate(NavigatorMap.ListMedia, {
      type: 'movie',
      subroute: 'upcoming',
    });
  };

  const handlePressMedia = (id: number) => () =>
    navigation.navigate(NavigatorMap.MediaDetail, {id, type: 'movie'});

  const renderItem = ({item}: {item: IMovieOverview[]}) => {
    if (item.length === 1) {
      return (
        <Box mr={2}>
          <TouchableOpacity onPress={handlePressMedia(item[0].id)}>
            <Image
              source={{uri: `${IMAGE_SERVER}${item[0].poster_path}`}}
              style={styles.singleImage}
            />
          </TouchableOpacity>
        </Box>
      );
    }

    return (
      <Box mr={2}>
        <TouchableOpacity onPress={handlePressMedia(item[0].id)}>
          <Image
            source={{uri: `${IMAGE_SERVER}${item[0].poster_path}`}}
            style={[styles.multiImage, styles.firstImage]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressMedia(item[1].id)}>
          <Image
            source={{uri: `${IMAGE_SERVER}${item[1].poster_path}`}}
            style={styles.multiImage}
          />
        </TouchableOpacity>
      </Box>
    );
  };

  return (
    <>
      <SectionHeader title="Upcoming" subtitle="Movie" onPress={handleSeeAll} />

      <Box mt={1.5}>
        <FlatList
          data={movies.slice(0, 5)}
          renderItem={renderItem}
          keyExtractor={item =>
            `${item.reduce((prev, curr) => prev + curr.title, '')}`
          }
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </Box>
    </>
  );
};

export default Upcoming;
