import Close from '@movie_trailer/assets/icons/Close';
import {getThumbnailForSelfieFrame} from '@movie_trailer/assets/pngs';
import {Box} from '@movie_trailer/components';
import {ISelfieFrameType, SELFIE_FRAMES} from '@movie_trailer/core/constants';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {chunk} from 'lodash';
import React from 'react';
import {Image, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  imageViewContainer: {
    flex: 1,
    position: 'relative',
  },
  imageContainer: {
    height: responsiveSize(229),
    backgroundColor: colors.codGray,
  },
});

interface ChangeFramePopupProps {
  isVisible: boolean;
  onClose: () => void;
  onChangeFrame: (item: ISelfieFrameType) => void;
}

const ChangeFramePopup = ({
  isVisible,
  onClose,
  onChangeFrame,
}: ChangeFramePopupProps) => {
  const handleSelectSelfieFrame = (item: ISelfieFrameType) => () => {
    onChangeFrame(item);
  };
  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={styles.modal}>
      <SafeAreaView style={styles.imageViewContainer}>
        <Box color={colors.codGray}>
          <Box flex={false} mt={4} mr={2} ml={2}>
            <TouchableOpacity onPress={onClose}>
              <Close />
            </TouchableOpacity>
          </Box>

          <Box m={2}>
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
          </Box>
        </Box>
      </SafeAreaView>
    </Modal>
  );
};

export default ChangeFramePopup;
