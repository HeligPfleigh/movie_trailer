import {
  AppBar,
  Box,
  HomeBackground,
  SectionHeader,
  Typography,
} from '@movie_trailer/components';
import {ISelfieFrameType, SELFIE_FRAMES} from '@movie_trailer/core/constants';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {colors, responsiveSize} from '@movie_trailer/theme';
import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useToast} from 'react-native-toast-notifications';
import {Camera} from 'react-native-vision-camera';
import PopularFrames from './components/PopularFrames';
import RecentFrames from './components/RecentFrames';
import {MovieSelfieScreenProps} from './types';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.codGray,
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
});

const MovieSelfieScreen: React.FC<MovieSelfieScreenProps> = ({
  navigation,
}: MovieSelfieScreenProps) => {
  const toast = useToast();

  const handleOpenSearch = () => navigation.navigate(NavigatorMap.Search);

  const handleSelectSelfieFrame = async (type: ISelfieFrameType) => {
    try {
      let cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === 'not-determined') {
        cameraPermission = await Camera.requestCameraPermission();
      }

      if (cameraPermission === 'authorized') {
        navigation.navigate(NavigatorMap.Search, {selfieMode: type});
      } else {
        toast.show(
          'Please manually grant us camera permission to take photo!',
          {type: 'normal'},
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show(error.message);
      }
    }
  };

  const handleViewAll = () => {
    navigation.navigate(NavigatorMap.SelfieFrameList, {
      title: 'Popular Frame',
      frames: [...SELFIE_FRAMES],
    });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollview}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar onSearch={handleOpenSearch} />

      <Box mt={2.5} ml={2} mb={2} flex={false}>
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          Movie Selfie
        </Typography>
      </Box>

      <RecentFrames onSelectFrame={handleSelectSelfieFrame} />

      <Box flex={false} m={2}>
        <SectionHeader title="Popular Frame" onPress={handleViewAll} />

        <PopularFrames
          onSelectFrame={handleSelectSelfieFrame}
          frames={[...SELFIE_FRAMES]}
        />
      </Box>
    </ScrollView>
  );
};

export default MovieSelfieScreen;
