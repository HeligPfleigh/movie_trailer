import {colors, responsiveSize, round} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Box, Typography} from '../common';

const styles = StyleSheet.create({
  container: {
    width: responsiveSize(116),
    height: responsiveSize(129),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: responsiveSize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    ...round(64),
    backgroundColor: '#d1c4e9',
  },
});

interface IGenreCardProps {
  image?: string;
  name: string;
}

const GenreCard: React.FC<IGenreCardProps> = ({image, name}) => {
  return (
    <TouchableOpacity>
      <Box flex={false} style={styles.container}>
        {image ? (
          <FastImage source={{uri: image}} style={styles.image} />
        ) : (
          <Box flex={false} style={styles.image} />
        )}
        <Typography variant="caps1" color={colors.white} numberOfLines={1}>
          {name}
        </Typography>
      </Box>
    </TouchableOpacity>
  );
};

export default GenreCard;
