import {Box, Typography} from '@movie_trailer/components';
import {IMAGE_SERVER} from '@movie_trailer/core/apis';
import {IImage} from '@movie_trailer/core/types';
import {colors, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

interface IGalleryProps {
  images: Array<IImage>;
}

const styles = StyleSheet.create({
  container: {
    height: 88,
    marginTop: spacing(2),
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: 88,
    borderRadius: 16,
  },
  lastImage: {
    position: 'relative',
    flex: 1,
  },
  moreOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Gallery: React.FC<IGalleryProps> = ({images}: IGalleryProps) => {
  const lastImage = images?.[3];

  const renderLastImage = () => (
    <TouchableOpacity key={lastImage.file_path} style={styles.lastImage}>
      <FastImage
        source={{uri: `${IMAGE_SERVER}${lastImage.file_path}`}}
        style={styles.image}
      />

      {images.length > 4 && (
        <Box style={styles.moreOverlay}>
          <Typography variant="b4" fontWeight="700" color={colors.white}>
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
      <Typography variant="h5" fontWeight="700" color={colors.white}>
        Gallery
      </Typography>

      <Box style={styles.container} flex={false}>
        {images.slice(0, 3).map(image => (
          <Box key={image.file_path}>
            <TouchableOpacity>
              <FastImage
                source={{uri: `${IMAGE_SERVER}${image.file_path}`}}
                style={styles.image}
              />
            </TouchableOpacity>
          </Box>
        ))}
        {lastImage && renderLastImage()}
      </Box>
    </Box>
  );
};

export default Gallery;
