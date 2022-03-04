import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {Box, Typography} from '@movie_trailer/components';
import {IImage} from '@movie_trailer/core/types';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import FastImage from 'react-native-fast-image';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import Star from '@movie_trailer/assets/icons/Star';

interface IPosterCarouselProps {
  posters: IImage[];
}

const {width: viewportWidth} = Dimensions.get('window');

const styles = StyleSheet.create({
  carouselItemContainer: {
    height: responsiveSize(396),
    width: responsiveSize(283),
    borderRadius: responsiveSize(16),
  },
  badge: {
    position: 'absolute',
    top: spacing(1),
    left: spacing(1),
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: spacing(1),
    paddingVertical: spacing(0.5),
    borderRadius: responsiveSize(8),
    alignItems: 'center',
  },
});

const PosterCarousel: React.FC<IPosterCarouselProps> = ({
  posters,
}: IPosterCarouselProps) => {
  const renderCarouselItem = ({item}: {item: IImage}) => {
    return (
      <Box flex={false} style={styles.carouselItemContainer}>
        <FastImage
          source={{uri: `${IMAGE_SERVER}${item.file_path}`}}
          style={styles.carouselItemContainer}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Box flex={false} style={styles.badge}>
          <Star />
          <Box flex={false} ml={0.5}>
            <Typography variant="h7" color={colors.white} fontWeight="700">
              {Number(item.vote_average).toFixed(1)}
            </Typography>
          </Box>
          <Box flex={false} ml={0.5}>
            <Typography variant="h7" color={colors.white}>
              {item.vote_count}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box flex={false} mt={4}>
      <Carousel
        sliderWidth={viewportWidth}
        itemWidth={viewportWidth * 0.75}
        data={posters}
        renderItem={renderCarouselItem}
      />
    </Box>
  );
};

export default PosterCarousel;
