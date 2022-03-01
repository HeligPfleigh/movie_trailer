import React, {useState} from 'react';
import {FlatList, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';

import {Box, Tabs} from '@movie_trailer/components';
import {RootState} from '@movie_trailer/store/rootReducer';
import SectionHeader from './SectionHeader';
import {IMovieOverview} from '@movie_trailer/core/types';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {responsiveSize, spacing} from '@movie_trailer/theme';
import {upcomingMoviesSelector} from '@movie_trailer/store/selectors/movie';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigationProps} from '../types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';

const listDatesString = (
  maximum: string,
  minimum: string,
): Array<{value: string; title: string}> => {
  const dateArray = [];
  let currentDate = dayjs(minimum);
  const stopDate = dayjs(maximum);
  while (currentDate <= stopDate) {
    dateArray.push(dayjs(currentDate).format('YYYY-MM-DD'));
    currentDate = dayjs(currentDate).add(1, 'days');
  }
  return dateArray.map(item => ({value: item, title: item}));
};

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
  const {dates} = useSelector((state: RootState) => state.movie.upcoming);
  const [activeTab, setActiveTab] = useState<string>('');

  const navigation = useNavigation<HomeNavigationProps>();

  const handleSeeAll = () => {
    navigation.navigate(NavigatorMap.ListMedia, {
      type: 'movie',
      subroute: 'upcomming',
    });
  };

  const renderItem = ({item}: {item: IMovieOverview[]}) => {
    if (item.length === 1) {
      return (
        <Box mr={2}>
          <Image
            source={{uri: `${IMAGE_SERVER}${item[0].poster_path}`}}
            style={styles.singleImage}
          />
        </Box>
      );
    }

    return (
      <Box mr={2}>
        <Image
          source={{uri: `${IMAGE_SERVER}${item[0].poster_path}`}}
          style={[styles.multiImage, styles.firstImage]}
        />
        <Image
          source={{uri: `${IMAGE_SERVER}${item[1].poster_path}`}}
          style={styles.multiImage}
        />
      </Box>
    );
  };

  return (
    <>
      <SectionHeader title="Upcomming Movie" onPress={handleSeeAll} />

      <Tabs
        tabs={listDatesString(dates.maximum, dates.minimum)}
        type="small"
        activeTab={activeTab}
        onTabChanged={setActiveTab}
      />

      <Box mt={1.5}>
        <FlatList
          data={movies}
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
