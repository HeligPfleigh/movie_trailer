import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import ShareIcon from '@movie_trailer/assets/icons/Share';
import AngleLeftIcon from '@movie_trailer/assets/icons/AngleLeft';
import SearchIcon from '@movie_trailer/assets/icons/Search';
import {Box} from '@movie_trailer/components';
import {colors} from '@movie_trailer/theme';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IAppBarProps {
  onShare?: () => void;
  onSearch?: () => void;
}

const AppBar: React.FC<IAppBarProps> = ({onShare, onSearch}: IAppBarProps) => {
  const navigation = useNavigation();

  const handleBack = () => navigation.goBack();

  return (
    <SafeAreaView>
      <Box row mt={2.5} pl={2} pr={2} flex={false}>
        <Box flex={false}>
          <TouchableOpacity onPress={handleBack}>
            <AngleLeftIcon />
          </TouchableOpacity>
        </Box>

        <Box />

        <Box flex={false} row center>
          {onShare && (
            <Box flex={false} mr={2}>
              <TouchableOpacity onPress={onShare}>
                <ShareIcon fill={colors.roseWhite} />
              </TouchableOpacity>
            </Box>
          )}

          {onSearch && (
            <TouchableOpacity onPress={onSearch}>
              <SearchIcon fill={colors.white} />
            </TouchableOpacity>
          )}
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default AppBar;
