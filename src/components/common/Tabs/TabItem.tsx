import React from 'react';

import Typography from '../Typography';
import Box from '../Box';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface ITabItemProps {
  title: string;
  isActive: boolean;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  inactive: {
    opacity: 0.4,
  },
  indicator: {
    width: responsiveSize(54),
    height: responsiveSize(3),
    backgroundColor: colors.white,
    marginTop: responsiveSize(3),
  },
});

// TODO: add animation for indicator and font size

const TabItem: React.FC<ITabItemProps> = ({
  title,
  onPress,
  isActive,
}: ITabItemProps) => {
  return (
    <Box flex={false} mr={2} style={!isActive && styles.inactive}>
      <TouchableOpacity onPress={onPress}>
        <Typography variant={isActive ? 'h4' : 'h5'} color={colors.white}>
          {title}
        </Typography>
        {isActive && <Box flex={false} style={styles.indicator} />}
      </TouchableOpacity>
    </Box>
  );
};

export default TabItem;
