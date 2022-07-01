import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

import {Box} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {getThumbnailForSelfieFrame} from '@movie_trailer/assets/pngs';
import {chunk} from 'lodash';
import {ISelfieFrameType, SELFIE_FRAMES} from '@movie_trailer/core/constants';

const styles = StyleSheet.create({
  imageContainer: {
    height: responsiveSize(229),
    backgroundColor: colors.codGray,
  },
});

type PopularFramesProps = {
  onSelectFrame: (type: ISelfieFrameType) => void;
};

const PopularFrames: React.FC<PopularFramesProps> = ({onSelectFrame}) => {
  const handleSelectSelfieFrame = (type: ISelfieFrameType) => async () => {
    onSelectFrame(type);
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
