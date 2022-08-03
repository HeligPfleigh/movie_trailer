import {Box, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {HomeNavigationProps} from '../types';
import SelfieWithMovieIcon from '@movie_trailer/assets/icons/SelfieWithMovieIcon';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {useInterstitialAd} from 'react-native-google-mobile-ads';
import {adConfigs} from '@movie_trailer/components/ads/config';

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
  const navigation = useNavigation<HomeNavigationProps>();

  const {isLoaded, load, show} = useInterstitialAd(
    adConfigs.interstitialAdUnitId,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  const handleNavigateToMovieSelfie = () => {
    if (isLoaded) {
      show();
    }
    navigation.navigate(NavigatorMap.MovieSelfie);
  };

  return (
    <TouchableOpacity onPress={handleNavigateToMovieSelfie}>
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
          <SelfieWithMovieIcon
            width={responsiveSize(187)}
            height={responsiveSize(104)}
          />
        </Box>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SelfieWithMovie;
