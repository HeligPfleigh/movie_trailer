import React from 'react';
import {Box, Typography} from '../common';
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

interface ISectionHeaderProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

const SectionHeader: React.FC<ISectionHeaderProps> = ({
  title,
  subtitle,
  onPress,
}: ISectionHeaderProps) => {
  return (
    <Box flex={false} row center mb={2}>
      <Typography variant="h5" fontFamily="Poppins-Bold" color={colors.white}>
        {title}
        {subtitle ? (
          <Typography variant="h5" color={colors.white}>
            {` ${subtitle}`}
          </Typography>
        ) : (
          ''
        )}
      </Typography>

      <Box flex={false} style={styles.divider} />

      <TouchableOpacity onPress={onPress}>
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
