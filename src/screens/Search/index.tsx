import {Box, HomeBackground} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CloseIcon from '@movie_trailer/assets/icons/Close';
import Search from '@movie_trailer/assets/icons/Search';
// import Micro from '@movie_trailer/assets/icons/Micro';
import CloseFill from '@movie_trailer/assets/icons/CloseFill';
import {useDispatch} from 'react-redux';
import {
  requestSearchMovie,
  requestSearchPeople,
  requestSearchTV,
} from '@movie_trailer/store/slices/searchSlice';
import throttle from 'lodash/throttle';
import {TextField} from 'react-native-material-textfield';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';
import {SearchScreenProps} from './types';
import CommonSearch from './components/CommonSearch';
import SelfieSearch from './components/SelfieSearch';

const styles = StyleSheet.create({
  searchContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    marginVertical: spacing(4),
    marginHorizontal: spacing(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textField: {
    top: spacing(-1),
  },
});

const SearchScreen: React.FC<SearchScreenProps> = ({
  navigation,
  route,
}: SearchScreenProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const {selfieMode} = route.params;

  const dispatch = useDispatch();
  const throttled = useRef(
    throttle(newValue => {
      dispatch(requestSearchMovie(newValue));
      dispatch(requestSearchTV(newValue));
      dispatch(requestSearchPeople(newValue));
    }, 2000),
  );
  const textFieldRef = useRef<TextField>(null);

  useEffect(() => {
    throttled.current(searchText);
  }, [searchText]);

  useFocusEffect(
    useCallback(() => {
      textFieldRef.current?.focus();

      return () => {
        textFieldRef.current?.clear();
      };
    }, []),
  );

  const handleBack = () => navigation.goBack();

  const handleClearSearch = () => {
    setSearchText('');
    textFieldRef.current?.clear();
  };

  const content = selfieMode ? (
    <SelfieSearch searchText={searchText} />
  ) : (
    <CommonSearch searchText={searchText} />
  );

  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <SafeAreaView>
        <Box row mt={2.5} pl={2} pr={2} flex={false}>
          <TouchableOpacity onPress={handleBack}>
            <CloseIcon />
          </TouchableOpacity>
        </Box>

        <Box flex={false} style={styles.searchContainer}>
          <Search fill={colors.white} />
          <Box middle ml={2}>
            <TextField
              ref={textFieldRef}
              label="Search movie, tv show, actor, ..."
              onChangeText={setSearchText}
              value={searchText}
              lineType="none"
              textColor={colors.white}
              fontSize={responsiveSize(18)}
              baseColor={colors.white}
              tintColor={colors.white}
              containerStyle={styles.textField}
              autoFocus
            />
          </Box>
          <TouchableOpacity onPress={handleClearSearch}>
            <Box mr={2} flex={false}>
              <CloseFill />
            </Box>
          </TouchableOpacity>
          {/* <Micro fill={colors.white} /> */}
        </Box>

        {content}
      </SafeAreaView>
    </Box>
  );
};

export default SearchScreen;
