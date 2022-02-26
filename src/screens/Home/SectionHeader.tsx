import React from 'react';
import {Box, Typography} from '@movie_trailer/components';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors, spacing} from '@movie_trailer/theme';
import AngleRightIcon from '@movie_trailer/assets/icons/AngleRight';

const styles = StyleSheet.create({
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: colors.white,
    marginRight: spacing(0.5),
    marginLeft: spacing(1),
    opacity: 0.5,
  },
});

const SectionHeader: React.FC = () => {
  return (
    <Box flex={false} row center>
      <Typography variant="h5" fontWeight="700" color={colors.white}>
        {'Popular '}
        <Typography variant="h5" fontWeight="400" color={colors.white}>
          Genres
        </Typography>
      </Typography>

      <Box flex={false} style={styles.divider} />

      <TouchableOpacity>
        <Box flex={false} row center>
          <Typography variant="caps1" color={colors.lavenderMagenta}>
            See All
          </Typography>
          <Box flex={false} ml={0.25}>
            <AngleRightIcon />
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};

export default SectionHeader;
