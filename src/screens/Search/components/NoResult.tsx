import React from 'react';

import {Box, Typography} from '@movie_trailer/components';
import {colors} from '@movie_trailer/theme';
import MovieIcon from '@movie_trailer/assets/icons/Movie';

interface INoResultProps {
  searchText?: string;
}

const NoResult: React.FC<INoResultProps> = ({searchText = ''}) => {
  return (
    <Box center middle mt={5}>
      <MovieIcon />

      <Typography variant="h6" color={colors.white}>
        {'No search results found '}
        <Typography variant="h6" fontFamily="Poppins-Bold" color={colors.white}>
          {`“${searchText}“`}
        </Typography>
      </Typography>

      <Box flex={false} mt={0.5}>
        <Typography color={colors.cadetBlue}>
          Please try another keyword
        </Typography>
      </Box>
    </Box>
  );
};

export default NoResult;
