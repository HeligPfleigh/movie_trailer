import Close from '@movie_trailer/assets/icons/Close';
import {Box, Typography} from '@movie_trailer/components';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {IImage} from '@movie_trailer/core/types';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React, {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-gallery';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IGalleryProps {
  images: Array<IImage>;
}

const styles = StyleSheet.create({
  container: {
    height: responsiveSize(88),
    marginTop: spacing(2),
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: responsiveSize(88),
    borderRadius: 16,
  },
  lastImage: {
    position: 'relative',
    flex: 1 / 4,
  },
  moreOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    margin: 0,
  },
  imageViewContainer: {
    flex: 1,
    position: 'relative',
  },
  imageView: {
    flex: 1,
    backgroundColor: colors.black,
  },
  closeIcon: {
    position: 'absolute',
    left: spacing(2),
    top: spacing(Platform.OS === 'ios' ? 5 : 2),
    zIndex: 2,
  },
});

const Gallery: React.FC<IGalleryProps> = ({images}: IGalleryProps) => {
  const [openGallery, setOpenGallery] = useState<number>(-1);
  const lastImage = images?.[3];

  const handleOpenImageView = (index: number) => () => setOpenGallery(index);

  const handleCloseImageView = () => setOpenGallery(-1);

  const renderLastImage = () => (
    <TouchableOpacity
      key={lastImage.file_path}
      style={styles.lastImage}
      onPress={handleOpenImageView(3)}>
      <FastImage
        source={{uri: `${IMAGE_SERVER}${lastImage.file_path}`}}
        style={styles.image}
      />

      {images.length > 4 && (
        <Box style={styles.moreOverlay}>
          <Typography
            variant="b4"
            fontFamily="Poppins-Bold"
            color={colors.white}>
            {`+${images.length - 4}`}
          </Typography>
          <Typography variant="caps2" color={colors.white}>
            See more
          </Typography>
        </Box>
      )}
    </TouchableOpacity>
  );

  return (
    <Box flex={false} ml={2} mr={2} mt={3}>
      <Typography variant="h5" fontFamily="Poppins-Bold" color={colors.white}>
        Gallery
      </Typography>

      <Box style={styles.container} flex={false}>
        {images.slice(0, 3).map((image, index) => (
          <Box key={image.file_path} flex={1 / 4}>
            <TouchableOpacity onPress={handleOpenImageView(index)}>
              <FastImage
                source={{uri: `${IMAGE_SERVER}${image.file_path}`}}
                style={styles.image}
              />
            </TouchableOpacity>
          </Box>
        ))}
        {lastImage && renderLastImage()}
      </Box>

      <Modal
        isVisible={openGallery !== -1}
        animationIn="fadeIn"
        animationOut="fadeOut"
        style={styles.modal}>
        <SafeAreaView style={styles.imageViewContainer}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={handleCloseImageView}>
            <Close />
          </TouchableOpacity>
          <ImageViewer
            initialPage={openGallery < 0 ? 0 : openGallery}
            style={styles.imageView}
            images={images
              .filter(image => image.file_path)
              .map(image => ({
                source: {uri: `${IMAGE_SERVER}${image.file_path}`},
                // dimensions: {width: image.width, height: image.height},
              }))}
          />
        </SafeAreaView>
      </Modal>
    </Box>
  );
};

export default Gallery;
