import PlayCircleFill2 from '@movie_trailer/assets/icons/PlayCircleFill2';
import {Box} from '@movie_trailer/components';
import {IVideo} from '@movie_trailer/core/types';
import {colors, responsiveSize} from '@movie_trailer/theme';
import React from 'react';
import {FlatList, Linking, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

interface ITrailersProps {
  videos: IVideo[];
}

const styles = StyleSheet.create({
  imageDefault: {
    borderRadius: responsiveSize(16),
    width: responsiveSize(245),
    height: responsiveSize(140),
    backgroundColor: colors.black,
    position: 'relative',
  },
  tinyImage: {width: responsiveSize(120), height: responsiveSize(70)},
  peerImage: {
    width: responsiveSize(280),
    height: responsiveSize(210),
    backgroundColor: colors.codGray,
    borderRadius: responsiveSize(16),
  },
  playIcon: {
    position: 'absolute',
    top: responsiveSize(55),
    left: responsiveSize(100),
  },
});

const Trailers: React.FC<ITrailersProps> = ({videos}: ITrailersProps) => {
  const handleOpenYoutube = (key: string) => () => {
    Linking.openURL(`https://youtu.be/${key}`);
  };

  const renderItem = ({item}: {item: IVideo}) => (
    <Box mr={2} flex={false} row>
      <Box flex={false}>
        <TouchableOpacity
          style={styles.imageDefault}
          onPress={handleOpenYoutube(item.key)}>
          <FastImage
            source={{
              uri: `https://img.youtube.com/vi/${item.key}/maxresdefault.jpg`,
            }}
            style={styles.imageDefault}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Box flex={false} style={styles.playIcon}>
            <PlayCircleFill2 />
          </Box>
        </TouchableOpacity>

        <Box
          flex={false}
          row
          color={colors.black}
          style={{borderRadius: responsiveSize(16)}}>
          <FastImage
            source={{
              uri: `https://img.youtube.com/vi/${item.key}/2.jpg`,
            }}
            style={styles.tinyImage}
            resizeMode={FastImage.resizeMode.contain}
          />
          <FastImage
            source={{
              uri: `https://img.youtube.com/vi/${item.key}/3.jpg`,
            }}
            style={styles.tinyImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Box>
      </Box>

      <Box flex={false} ml={1} style={{borderRadius: responsiveSize(16)}}>
        <FastImage
          source={{
            uri: `https://img.youtube.com/vi/${item.key}/maxres1.jpg`,
          }}
          style={styles.peerImage}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Box>
    </Box>
  );

  return (
    <Box ml={2} flex={false} mt={2}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </Box>
  );
};

export default Trailers;
