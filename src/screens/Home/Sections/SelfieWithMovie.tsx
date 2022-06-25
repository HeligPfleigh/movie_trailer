import {Box, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import {useNavigation} from '@react-navigation/native';
// import {HomeNavigationProps} from '../types';
// import {useDispatch} from 'react-redux';
import SelfieWithMovieIcon from '@movie_trailer/assets/icons/SelfieWithMovieIcon';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: responsiveSize(8),
    paddingHorizontal: spacing(2.5),
    paddingTop: spacing(1),
    flexDirection: 'row',
    position: 'relative',
  },
  large: {
    fontSize: responsiveSize(30),
  },
  medium: {
    fontSize: responsiveSize(14),
  },
  icon: {
    bottom: 0,
    right: spacing(1),
    position: 'absolute',
  },
});

const SelfieWithMovie: React.FC = () => {
  // const navigation = useNavigation<HomeNavigationProps>();
  // const dispatch = useDispatch();

  return (
    <TouchableOpacity>
      <LinearGradient
        colors={[colors.persianPink, colors.cornflowerBlue]}
        useAngle={true}
        angle={135}
        angleCenter={{x: 0.5, y: 0.5}}
        style={styles.container}>
        <Box middle>
          <Typography
            style={styles.large}
            color={colors.white}
            fontFamily="Poppins-Bold">
            Selfie
            <Typography
              style={styles.medium}
              color={colors.white}
              fontFamily="Poppins-Bold">
              {'\n\t\t with\n'}
            </Typography>
            Movies
          </Typography>
        </Box>

        <Box flex={false} style={styles.icon}>
          <SelfieWithMovieIcon />
        </Box>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SelfieWithMovie;
