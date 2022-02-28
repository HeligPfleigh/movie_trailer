import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Box, MediaSearchCard, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {IMediaOverview} from '@movie_trailer/core/types';
import LinearGradient from 'react-native-linear-gradient';
import PlayCircleFill from '@movie_trailer/assets/icons/PlayCircleFill';

const styles = StyleSheet.create({
  heroImage: {
    height: responsiveSize(421),
    width: '100%',
    position: 'relative',
  },
  heroTitleContainer: {
    position: 'absolute',
    height: responsiveSize(130),
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchNowBtn: {
    width: responsiveSize(134),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveSize(22),
    height: responsiveSize(40),
    marginTop: spacing(1.5),
    flexDirection: 'row',
  },
});

interface ILatestShowsProps {
  medias: Array<IMediaOverview>;
}

const LatestShows: React.FC<ILatestShowsProps> = ({
  medias,
}: ILatestShowsProps) => {
  const [latestMedia, ...rest] = medias.slice(0, 4);
  return (
    <>
      <Box flex={false}>
        <FastImage
          source={{uri: latestMedia.poster}}
          style={styles.heroImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <LinearGradient
          colors={['rgba(74, 85, 104, 0)', colors.riverBed]}
          style={styles.heroTitleContainer}>
          <Typography variant="h6" color={colors.zircon} fontWeight="700">
            {latestMedia.title}
          </Typography>

          <TouchableOpacity>
            <LinearGradient
              colors={[colors.torchRed, '#E1334E']}
              useAngle={true}
              angle={135}
              angleCenter={{x: 0.5, y: 0.5}}
              style={styles.watchNowBtn}>
              <Box flex={false} mr={1}>
                <PlayCircleFill />
              </Box>
              <Typography variant="caps2" color={colors.white}>
                Watch video
              </Typography>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </Box>

      <Box flex={false} color={colors.riverBed}>
        {rest.map((media, index) => (
          <Box key={media.id}>
            <Box ml={2}>
              <Typography
                variant="caps1"
                color={colors.white}
                fontWeight="700">{`${index + 1}.`}</Typography>
            </Box>
            <MediaSearchCard {...media} isTVShow />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default LatestShows;
