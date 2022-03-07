import React from 'react';
import FastImage from 'react-native-fast-image';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Box, MediaSearchCard, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import LinearGradient from 'react-native-linear-gradient';
import PlayCircleFill from '@movie_trailer/assets/icons/PlayCircleFill';
import {useSelector} from 'react-redux';
import {RootState} from '@movie_trailer/store/rootReducer';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';

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

const LatestShows: React.FC = () => {
  const latestShow = useSelector((state: RootState) => state.tvShow.latest);

  if (!latestShow) {
    return null;
  }

  const genres = latestShow.genres.map(genre => genre.name).join(', ');

  return (
    <>
      {latestShow && (
        <Box flex={false} color={colors.codGray}>
          <FastImage
            source={{uri: `${IMAGE_SERVER}${latestShow.poster_path}`}}
            style={styles.heroImage}
            resizeMode={FastImage.resizeMode.cover}
          />
          <LinearGradient
            colors={['rgba(74, 85, 104, 0)', colors.riverBed]}
            style={styles.heroTitleContainer}>
            <Typography variant="h6" color={colors.zircon} fontWeight="700">
              {latestShow.name}
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
      )}

      <Box flex={false} color={colors.riverBed}>
        {latestShow.videos.results.map((media, index) => (
          <Box key={media.id}>
            <Box ml={2}>
              <Typography variant="caps1" color={colors.white} fontWeight="700">
                {`${String(index + 1).padStart(2, '0')}.`}
              </Typography>
            </Box>
            <MediaSearchCard
              id={media.id}
              genres={genres}
              isLive
              title={media.name}
              poster={
                media.site === 'YouTube'
                  ? `https://img.youtube.com/vi/${media.key}/default.jpg`
                  : ''
              }
              rating={latestShow.vote_average}
              time={`${Math.floor(media.size / 3600)}h${Math.round(
                (media.size % 3600) / 60,
              )}p`}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default LatestShows;
