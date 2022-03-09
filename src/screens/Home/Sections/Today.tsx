import {Box, MovieCard, SectionHeader} from '@movie_trailer/components';
import {IMediaOverview} from '@movie_trailer/core/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {loadInitial} from '@movie_trailer/store/slices/mediaListSlice';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {HomeNavigationProps} from '../types';

interface ITodayProps {
  medias: Array<IMediaOverview>;
  type: 'movie' | 'tv';
}

const INDICATOR_CONTAINER_WIDTH = 35;
const INDICATOR_CONTAINER_HEIGHT = 6;

const styles = StyleSheet.create({
  indicatorContainer: {
    width: INDICATOR_CONTAINER_WIDTH,
    height: INDICATOR_CONTAINER_HEIGHT,
    backgroundColor: 'rgba(203, 213, 224, 0.2)',
    borderRadius: responsiveSize(8),
  },
  indicator: {
    height: INDICATOR_CONTAINER_HEIGHT,
    borderRadius: responsiveSize(8),
    backgroundColor: colors.royalBlue,
  },
});

const Today: React.FC<ITodayProps> = ({medias, type}: ITodayProps) => {
  const navigation = useNavigation<HomeNavigationProps>();
  const dispatch = useDispatch();
  const [completeScrollBarWidth, setCompleteScrollBarWidth] =
    useState<number>(1);

  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  const stylez = useAnimatedStyle(() => {
    const width =
      (translateX.value / completeScrollBarWidth) * INDICATOR_CONTAINER_WIDTH +
      5;
    return {
      width:
        width > INDICATOR_CONTAINER_WIDTH ? INDICATOR_CONTAINER_WIDTH : width,
    };
  });

  const handlePressMedia = (id: number) => () =>
    navigation.navigate(NavigatorMap.MediaDetail, {id, type});

  const renderItem = ({item}: {item: IMediaOverview}) => (
    <Box mr={2}>
      <MovieCard {...item} onPress={handlePressMedia(item.id)} />
    </Box>
  );

  const handleSeeAll = () => {
    dispatch(
      loadInitial({
        url: `${type}/${type === 'movie' ? 'now_playing' : 'airing_today'}`,
      }),
    );

    navigation.push(NavigatorMap.ListMedia, {
      type,
      title: 'Today',
    });
  };

  return (
    <>
      <SectionHeader title="Today" onPress={handleSeeAll} />

      <Animated.FlatList
        data={medias.slice(0, 10)}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={width => {
          setCompleteScrollBarWidth(width);
        }}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />

      <Box center mt={2}>
        <View
          style={{
            width: INDICATOR_CONTAINER_WIDTH,
          }}>
          <View style={styles.indicatorContainer}>
            <Animated.View style={[styles.indicator, stylez]} />
          </View>
        </View>
      </Box>
    </>
  );
};

export default Today;
