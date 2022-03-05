import {Box, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PopularPersonIcon from '@movie_trailer/assets/icons/PopularPerson';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigationProps} from '../types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {useDispatch} from 'react-redux';
import {loadInitial} from '@movie_trailer/store/slices/popularPeopleSlice';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: responsiveSize(8),
    paddingVertical: spacing(1.5),
    paddingHorizontal: spacing(2.5),
    flexDirection: 'row',
  },
  seeAllBtn: {
    width: responsiveSize(98),
    padding: spacing(0.5),
    backgroundColor: colors.cornflowerBlue,
    alignItems: 'center',
    borderRadius: responsiveSize(6),
    marginTop: spacing(1),
  },
});

const PersonPopular: React.FC = () => {
  const navigation = useNavigation<HomeNavigationProps>();
  const dispatch = useDispatch();

  const handleNavigateToPersonPopular = () => {
    dispatch(loadInitial());
    navigation.push(NavigatorMap.PopularPeople, {title: 'Popular People'});
  };

  return (
    <TouchableOpacity onPress={handleNavigateToPersonPopular}>
      <LinearGradient
        colors={[colors.persianPink, colors.cornflowerBlue]}
        useAngle={true}
        angle={135}
        angleCenter={{x: 0.5, y: 0.5}}
        style={styles.container}>
        <Box middle>
          <Typography variant="caps1" color={colors.white}>
            Person
          </Typography>
          <Typography variant="h4" color={colors.white} fontWeight="700">
            Popular
          </Typography>

          <TouchableOpacity
            style={styles.seeAllBtn}
            onPress={handleNavigateToPersonPopular}>
            <Typography variant="b5" color={colors.white}>
              See All
            </Typography>
          </TouchableOpacity>
        </Box>

        <Box flex={false}>
          <PopularPersonIcon />
        </Box>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PersonPopular;
