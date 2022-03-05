import Season from '@movie_trailer/assets/icons/Season';
import {Box, Typography} from '@movie_trailer/components';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {ISeasonOverview} from '@movie_trailer/core/types';
import {colors, responsiveSize, round, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  root: {
    position: 'relative',
    margin: spacing(2),
  },
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: responsiveSize(8),
  },
  thumbnail: {
    width: responsiveSize(155),
    height: responsiveSize(104),
    borderRadius: responsiveSize(8),
    backgroundColor: colors.cadetBlue,
  },
  icon: {
    ...round(36),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255,255,0.3)',
  },
});

interface ISeasonsProps {
  seasons: Array<ISeasonOverview>;
}

const Item = ({season}: {season: ISeasonOverview}) => {
  return (
    <TouchableOpacity>
      <Box flex={false} row mb={1.5}>
        <Box flex={false} style={styles.thumbnail}>
          <FastImage
            source={{
              uri: season.poster_path
                ? `${IMAGE_SERVER}${season.poster_path}`
                : '',
            }}
            style={styles.thumbnail}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Box>

        <Box ml={2} mr={1} middle>
          <Typography variant="caps1" color={colors.zircon}>
            {season.name ?? 'Season'}
          </Typography>
          <Typography variant="caps2" color={colors.cadetBlue}>
            {season.air_date ?? 'N/A'}
          </Typography>
        </Box>

        <Box flex={false} middle>
          <TouchableOpacity style={styles.icon}>
            <Season />
          </TouchableOpacity>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

const Seasons: React.FC<ISeasonsProps> = ({seasons}: ISeasonsProps) => {
  return (
    <Box flex={false} style={styles.root}>
      <LinearGradient
        colors={['rgba(119, 99, 239, 1)', 'rgba(119, 99, 239, 0)']}
        style={styles.container}
      />

      <Box m={1.5}>
        <Box flex={false} center mb={1.5}>
          <Typography variant="h5" color={colors.white}>
            Your next episode
          </Typography>
        </Box>
        {seasons.map(season => (
          <Item key={season.id} season={season} />
        ))}
      </Box>
    </Box>
  );
};

export default Seasons;
