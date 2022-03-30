import React from 'react';
import {Box, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {IEpisodeOverview} from '@movie_trailer/core/types';

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    marginBottom: spacing(2),
  },
  thumbnail: {
    height: responsiveSize(150),
    width: '100%',
    borderTopLeftRadius: responsiveSize(16),
    borderTopRightRadius: responsiveSize(16),
    backgroundColor: colors.cadetBlue,
  },
});

interface IEpisodesProps {
  episodes: Array<IEpisodeOverview>;
}

const Episodes: React.FC<IEpisodesProps> = ({episodes}: IEpisodesProps) => {
  if (!episodes.length) {
    return (
      <Box center middle mt={5}>
        <Typography variant="h6" color={colors.white} textAlign="center">
          There isn't any episode information for this season.
        </Typography>
      </Box>
    );
  }
  return (
    <Box flex={false} style={styles.root}>
      <Box flex={false} center mb={1.5} mt={1.5}>
        <Typography variant="h5" color={colors.white}>
          List episodes
        </Typography>
      </Box>

      {episodes.map(episode => (
        <Box
          flex={false}
          color={colors.riverBed}
          style={{borderRadius: responsiveSize(16)}}
          key={episode.id}
          mb={2}>
          <FastImage
            source={{uri: `${IMAGE_SERVER}${episode.still_path}`}}
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />

          <Box flex={false} m={1.5}>
            <Typography variant="caps1" color={colors.white}>
              {episode.air_date}
            </Typography>
            <Box flex={false} mt={0.5} mb={1}>
              <Typography
                variant="h5"
                color={colors.white}
                fontFamily="Poppins-SemiBold">
                {episode.name}
              </Typography>
            </Box>
            <Typography variant="caps1" color={colors.white}>
              {episode.overview}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Episodes;
