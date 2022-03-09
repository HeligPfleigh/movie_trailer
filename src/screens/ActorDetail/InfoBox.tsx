import {Box, Typography} from '@movie_trailer/components';
import {colors, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    borderBottomColor: colors.white,
    borderBottomWidth: 1,
    marginHorizontal: spacing(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing(1.5),
    alignItems: 'center',
  },
});

interface IInfoBoxProps {
  title: string;
  value: string | number;
}

const InfoBox: React.FC<IInfoBoxProps> = ({title, value}: IInfoBoxProps) => {
  return (
    <Box flex={false} style={styles.container}>
      <Typography color={colors.slateGray} variant="caps2">
        {title}
      </Typography>
      <Typography color={colors.white} fontFamily="Poppins-Bold" variant="b4">
        {value}
      </Typography>
    </Box>
  );
};

export default InfoBox;
