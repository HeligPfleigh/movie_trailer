import {Box, MovieCard, SectionHeader} from '@movie_trailer/components';
import {IMediaOverview} from '@movie_trailer/core/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {loadInitial} from '@movie_trailer/store/slices/mediaListSlice';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState} from 'react';
import {FlatList, View, Animated, StyleSheet} from 'react-native';
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

  const [completeScrollBarWidth, setCompleteScrollBarWidth] = useState(1);
  const [visibleScrollBarWidth, setVisibleScrollBarWidth] = useState(0);
  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const scrollIndicatorSize =
    completeScrollBarWidth > visibleScrollBarWidth
      ? (visibleScrollBarWidth * visibleScrollBarWidth) / completeScrollBarWidth
      : visibleScrollBarWidth;

  const difference =
    visibleScrollBarWidth > scrollIndicatorSize
      ? visibleScrollBarWidth - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    (INDICATOR_CONTAINER_WIDTH +
      (visibleScrollBarWidth * (INDICATOR_CONTAINER_WIDTH + 2)) /
        completeScrollBarWidth) /
      completeScrollBarWidth,
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: 'clamp',
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

      <FlatList
        data={medias.slice(0, 10)}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={width => {
          setCompleteScrollBarWidth(width);
        }}
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          setVisibleScrollBarWidth(width);
        }}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollIndicator}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
      />

      <Box center mt={2}>
        <View
          style={{
            width: INDICATOR_CONTAINER_WIDTH,
          }}>
          <View style={styles.indicatorContainer}>
            <Animated.View
              style={[styles.indicator, {width: scrollIndicatorPosition}]}
            />
          </View>
        </View>
      </Box>
    </>
  );
};

export default Today;
