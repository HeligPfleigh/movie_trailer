import Season from '@movie_trailer/assets/icons/Season';
import {Box, Typography} from '@movie_trailer/components';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {ISeasonOverview} from '@movie_trailer/core/types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {colors, responsiveSize, round, spacing} from '@movie_trailer/theme';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {MediaDetailNavigationProps} from '../types';

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
  id: number;
  seasons: Array<ISeasonOverview>;
}

interface ISeasonItem {
  season: ISeasonOverview;
  onPress?: () => void;
}

const Item: React.FC<ISeasonItem> = ({season, onPress}: ISeasonItem) => {
  return (
    <TouchableOpacity onPress={onPress}>
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

const Seasons: React.FC<ISeasonsProps> = ({id, seasons}: ISeasonsProps) => {
  const navigation = useNavigation<MediaDetailNavigationProps>();

  const handlePressSeasonDetail = (seasonNumber: number) => () => {
    navigation.push(NavigatorMap.SeasonDetail, {
      tvID: id,
      seasonNumber,
    });
  };

  return (
    <Box flex={false} style={styles.root}>
      <LinearGradient
        colors={['rgba(119, 99, 239, 1)', 'rgba(119, 99, 239, 0)']}
        style={styles.container}
      />

      <Box m={1.5}>
        <Box flex={false} center mb={1.5}>
          <Typography variant="h5" color={colors.white}>
            List seasons
          </Typography>
        </Box>
        {seasons.map(season => (
          <Item
            key={season.id}
            season={season}
            onPress={handlePressSeasonDetail(season.season_number)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Seasons;
