import {HomeBackground} from '@movie_trailer/components';
import {colors} from '@movie_trailer/theme';
import * as React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.codGray,
  },
});

function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeBackground />
    </View>
  );
}

export default HomeScreen;
