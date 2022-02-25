import {colors} from '@movie_trailer/theme';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    borderBottomLeftRadius: 150,
  },
  circleContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
  },
  circle: {
    width: 300,
    height: 300,
    backgroundColor: 'white',
    opacity: 0.1,
    borderRadius: 150,
    position: 'absolute',
    top: -80,
    right: -80,
  },
});

interface IHomeBackgroundProps {
  height?: number;
}

const HomeBackground: React.FC<IHomeBackgroundProps> = ({
  height = 300,
}: IHomeBackgroundProps) => {
  return (
    <LinearGradient
      colors={[colors.fuchsiaPink, colors.irisBlue]}
      useAngle={true}
      angle={135}
      angleCenter={{x: 0.5, y: 0.5}}
      style={[styles.container, {height}]}>
      <View style={styles.circleContainer}>
        <View style={styles.circle} />
      </View>
    </LinearGradient>
  );
};

export default HomeBackground;
