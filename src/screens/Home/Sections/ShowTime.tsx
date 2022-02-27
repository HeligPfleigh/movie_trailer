import {Typography} from '@movie_trailer/components';
import {colors, responsiveSize, size, spacing} from '@movie_trailer/theme';
import {ShowTime as ShowTimeImg} from '@movie_trailer/assets/pngs';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 112,
    borderRadius: responsiveSize(8),
    padding: spacing(1.5),
  },
  seeAllBtn: {
    width: responsiveSize(98),
    padding: spacing(0.5),
    backgroundColor: colors.cornflowerBlue,
    alignItems: 'center',
    borderRadius: responsiveSize(6),
    marginTop: spacing(1),
  },
  image: {
    ...size(125),
    position: 'absolute',
    top: responsiveSize(-30),
    right: 0,
  },
});

const ShowTime: React.FC = () => {
  return (
    <TouchableOpacity>
      <LinearGradient
        colors={[colors.persianPink, colors.cornflowerBlue]}
        useAngle={true}
        angle={135}
        angleCenter={{x: 0.5, y: 0.5}}
        style={styles.container}>
        <Typography variant="caps1" color={colors.white}>
          Check Movies
        </Typography>
        <Typography variant="h4" color={colors.white} fontWeight="700">
          Showtime
        </Typography>

        <TouchableOpacity style={styles.seeAllBtn}>
          <Typography variant="b5" color={colors.white}>
            See All
          </Typography>
        </TouchableOpacity>

        <Image source={ShowTimeImg} style={styles.image} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ShowTime;
