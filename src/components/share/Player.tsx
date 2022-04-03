import {RootState} from '@movie_trailer/store/rootReducer';
import {closeVideo} from '@movie_trailer/store/slices/miscSlice';
import {colors, spacing} from '@movie_trailer/theme';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import YouTube from 'react-native-youtube';
import {useDispatch, useSelector} from 'react-redux';
import CloseIcon from '@movie_trailer/assets/icons/Close';
import Config from 'react-native-config';

import {Box} from '../common';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  closeIcon: {
    position: 'absolute',
    left: spacing(2),
    top: spacing(Platform.OS === 'ios' ? 5 : 2),
    zIndex: 2,
  },
  video: {
    alignSelf: 'stretch',
    height: 300,
  },
});

const VideoPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const url = useSelector((state: RootState) => state.misc.url);

  const handleClose = () => {
    dispatch(closeVideo());
  };

  if (!url) {
    return null;
  }

  return (
    <Box style={styles.container}>
      <Box style={styles.closeIcon} flex={false}>
        <TouchableOpacity onPress={handleClose}>
          <CloseIcon />
        </TouchableOpacity>
      </Box>
      <YouTube
        apiKey={Config.YOUTUBE_API_KEY}
        videoId={url}
        play
        style={styles.video}
      />
    </Box>
  );
};

export default VideoPlayer;
