import Close from '@movie_trailer/assets/icons/Close';
import {Box, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React, {useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-gallery';
import Modal from 'react-native-modal';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IGalleryProps {
  images: Array<string>;
}

const styles = StyleSheet.create({
  container: {
    height: responsiveSize(48),
    marginTop: spacing(1),
    flexDirection: 'row',
  },
  image: {
    width: responsiveSize(48),
    height: responsiveSize(48),
    borderRadius: responsiveSize(8),
  },
  lastImage: {
    position: 'relative',
  },
  moreOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveSize(8),
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
  const lastImage = images?.[2];

  const handleOpenImageView = (index: number) => () => setOpenGallery(index);

  const handleCloseImageView = () => setOpenGallery(-1);

  const renderLastImage = () => (
    <TouchableOpacity
      key={lastImage}
      style={styles.lastImage}
      onPress={handleOpenImageView(3)}>
      <FastImage source={{uri: lastImage}} style={styles.image} />

      {images.length > 3 && (
        <Box style={styles.moreOverlay}>
          <Typography
            variant="b4"
            fontFamily="Poppins-Bold"
            color={colors.white}>
            {`+${images.length - 3}`}
          </Typography>
        </Box>
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <Box style={styles.container} flex={false}>
        {images.slice(0, 2).map((image, index) => (
          <Box key={image} mr={1} flex={false}>
            <TouchableOpacity onPress={handleOpenImageView(index)}>
              <FastImage source={{uri: image}} style={styles.image} />
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
              .filter(image => image)
              .map(image => ({
                source: {uri: image},
              }))}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default Gallery;
