import {getThumbnailForSelfieFrame} from '@movie_trailer/assets/pngs';
import {Box, SectionHeader} from '@movie_trailer/components';
import {ISelfieFrameType} from '@movie_trailer/core/constants';
import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {RootState} from '@movie_trailer/store/rootReducer';
import {colors, responsiveSize} from '@movie_trailer/theme';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {MovieSelfieNavigationProps} from '../types';

const styles = StyleSheet.create({
  imageContainer: {
    width: responsiveSize(120),
    height: responsiveSize(200),
    backgroundColor: colors.codGray,
  },
});

type RecentFramesProps = {
  onSelectFrame: (type: ISelfieFrameType) => void;
};

const RecentFrames: React.FC<RecentFramesProps> = ({onSelectFrame}) => {
  const recentSelfieTypes = useSelector(
    (state: RootState) => state.selfie.recentSelfieTypes,
  );
  const navigation = useNavigation<MovieSelfieNavigationProps>();

  const handleSelectSelfieFrame = (item: ISelfieFrameType) => () => {
    onSelectFrame(item);
  };

  const handleViewAll = () => {
    navigation.navigate(NavigatorMap.SelfieFrameList, {
      title: 'Recently Used',
      frames: recentSelfieTypes,
    });
  };

  const renderItem = ({item}: {item: ISelfieFrameType}) => (
    <Box mr={2}>
      <TouchableOpacity onPress={handleSelectSelfieFrame(item)}>
        <FastImage
          resizeMode={FastImage.resizeMode.contain}
          source={getThumbnailForSelfieFrame(item)}
          style={styles.imageContainer}
        />
      </TouchableOpacity>
    </Box>
  );

  if (!recentSelfieTypes.length) {
    return null;
  }

  return (
    <Box flex={false} m={2}>
      <SectionHeader title="Recently Used" onPress={handleViewAll} />

      <FlatList
        data={recentSelfieTypes}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal
      />
    </Box>
  );
};

export default RecentFrames;
