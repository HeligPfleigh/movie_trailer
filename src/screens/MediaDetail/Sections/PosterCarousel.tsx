import React from 'react';
import {Dimensions, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import Carousel from 'react-native-snap-carousel';

import {Box, Typography} from '@movie_trailer/components';
import {IImage} from '@movie_trailer/core/types';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import FastImage from 'react-native-fast-image';
import {colors, responsiveSize, round, spacing} from '@movie_trailer/theme';
import Star from '@movie_trailer/assets/icons/Star';
import HeartFill from '@movie_trailer/assets/icons/HeartFill';
import Heart from '@movie_trailer/assets/icons/Heart';
import PlayCircleFill2 from '@movie_trailer/assets/icons/PlayCircleFill2';

interface IPosterCarouselProps {
  posters: IImage[];
  isFavorite?: boolean;
  homepage: string | null;
  onToggleFavorite?: () => void;
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
  favorite: {
    ...round(24),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: responsiveSize(8),
    right: responsiveSize(8),
  },
  playBtn: {
    top: responsiveSize(170),
    left: responsiveSize(115),
    position: 'absolute',
  },
});

const PosterCarousel: React.FC<IPosterCarouselProps> = ({
  posters,
  isFavorite,
  homepage,
  onToggleFavorite,
}: IPosterCarouselProps) => {
  const handleOpenHomepage = () => {
    if (homepage) {
      Linking.openURL(homepage);
    }
  };

  let icon = isFavorite ? (
    <HeartFill width={responsiveSize(12)} height={responsiveSize(12)} />
  ) : (
    <Heart width={responsiveSize(12)} height={responsiveSize(12)} />
  );

  const backgroundColor = isFavorite
    ? 'rgba(255, 31, 31, 0.3)'
    : 'rgba(255, 255, 255, 0.3)';

  const renderCarouselItem = ({item, index}: {item: IImage; index: number}) => {
    const displayPlayBtn = Boolean(homepage) && index === 0;
    return (
      <Box flex={false} style={styles.carouselItemContainer}>
        <FastImage
          source={{uri: `${IMAGE_SERVER}${item.file_path}`}}
          style={styles.carouselItemContainer}
          resizeMode={FastImage.resizeMode.cover}
        />

        {displayPlayBtn && (
          <TouchableOpacity style={styles.playBtn} onPress={handleOpenHomepage}>
            <PlayCircleFill2
              width={responsiveSize(56)}
              height={responsiveSize(56)}
            />
          </TouchableOpacity>
        )}

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

        <TouchableOpacity
          style={[styles.favorite, {backgroundColor}]}
          onPress={onToggleFavorite}>
          {icon}
        </TouchableOpacity>
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
