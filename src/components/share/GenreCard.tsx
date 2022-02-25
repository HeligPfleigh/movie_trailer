import {colors, responsiveSize, round} from '@movie_trailer/theme';
import React from 'react';
import {Image, StyleSheet} from 'react-native';
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
    <Box flex={false} style={styles.container}>
      {image ? (
        <Image source={{uri: image}} style={styles.image} />
      ) : (
        <Box flex={false} style={styles.image} />
      )}
      <Typography variant="caps1" color={colors.white}>
        {name}
      </Typography>
    </Box>
  );
};

export default GenreCard;
