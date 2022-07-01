import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useToast} from 'react-native-toast-notifications';
import {Camera} from 'react-native-vision-camera';

import {Box} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {getThumbnailForSelfieFrame} from '@movie_trailer/assets/pngs';
import {chunk} from 'lodash';
import {ISelfieFrameType, SELFIE_FRAMES} from '@movie_trailer/core/constants';
import {MovieSelfieNavigationProps} from '../types';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';

const styles = StyleSheet.create({
  imageContainer: {
    height: responsiveSize(229),
    backgroundColor: colors.codGray,
  },
});

const PopularFrames: React.FC = () => {
  const navigation = useNavigation<MovieSelfieNavigationProps>();

  const toast = useToast();

  const handleSelectSelfieFrame = (type: ISelfieFrameType) => async () => {
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

  return (
    <>
      {chunk(SELFIE_FRAMES, 2).map(([first, second]) => (
        <Box mb={2} key={first} row>
          <Box mr={1}>
            <TouchableOpacity onPress={handleSelectSelfieFrame(first)}>
              <Image
                source={getThumbnailForSelfieFrame(first)}
                style={styles.imageContainer}
              />
            </TouchableOpacity>
          </Box>
          {second ? (
            <Box ml={1}>
              <TouchableOpacity onPress={handleSelectSelfieFrame(second)}>
                <Image
                  source={getThumbnailForSelfieFrame(second)}
                  style={styles.imageContainer}
                />
              </TouchableOpacity>
            </Box>
          ) : (
            <Box ml={1} />
          )}
        </Box>
      ))}
    </>
  );
};

export default PopularFrames;
