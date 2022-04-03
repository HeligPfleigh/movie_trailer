// import MicroIcon from '@movie_trailer/assets/icons/Micro';
import SearchIcon from '@movie_trailer/assets/icons/Search';
import {Box, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: responsiveSize(54),
    padding: spacing(2),
    backgroundColor: colors.white,
    borderRadius: responsiveSize(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: colors.cadetBlue,
    marginRight: spacing(2),
  },
});

interface ISearchBoxProps {
  onPress?: () => void;
}

const SearchBox: React.FC<ISearchBoxProps> = ({onPress}: ISearchBoxProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box flex={false} style={styles.container}>
        <SearchIcon fill={colors.mirage} />
        <Box ml={2}>
          <Typography variant="caps1" color={colors.riverBed}>
            Search
          </Typography>
        </Box>
        {/* <Box flex={false} style={styles.divider} />
        <MicroIcon fill="#4A5568" /> */}
      </Box>
    </TouchableOpacity>
  );
};

export default SearchBox;
