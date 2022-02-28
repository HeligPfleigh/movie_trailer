import HeartFillIcon from '@movie_trailer/assets/icons/HeartFill';
import PrivacyIcon from '@movie_trailer/assets/icons/Privacy';
import ShareIcon from '@movie_trailer/assets/icons/Share';
import StarIcon from '@movie_trailer/assets/icons/Star';
import {
  AppBar,
  Box,
  HomeBackground,
  Typography,
} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet} from 'react-native';
import SettingItem from './SettingItem';

const styles = StyleSheet.create({
  settings: {
    height: responsiveSize(300),
    backgroundColor: colors.oxfordBlue,
    margin: spacing(2),
    borderRadius: responsiveSize(16),
  },
});

const SettingScreen: React.FC = () => {
  const settings = [
    [
      {
        onPress: () => {},
        icon: <PrivacyIcon />,
        title: 'Privacy Policy',
        color: colors.selago,
      },
      {
        onPress: () => {},
        icon: (
          <StarIcon width={responsiveSize(32)} height={responsiveSize(32)} />
        ),
        title: 'Rating App',
        color: colors.halfDutchWhite,
      },
    ],
    [
      {
        onPress: () => {},
        icon: (
          <ShareIcon
            fill={colors.scooter}
            width={responsiveSize(32)}
            height={responsiveSize(32)}
          />
        ),
        title: 'Share App',
        color: colors.whiteIce,
      },
      {
        onPress: () => {},
        icon: <HeartFillIcon />,
        title: 'Feedback',
        color: colors.cinderella,
      },
    ],
  ];
  return (
    <Box color={colors.codGray}>
      <HomeBackground height={responsiveSize(337)} />
      <AppBar />

      <Box mt={2.5} ml={2} flex={false}>
        <Typography variant="h4" color={colors.white} fontWeight="600">
          Setting
        </Typography>
      </Box>

      <Box flex={false} style={styles.settings}>
        {settings.map((group, index) => (
          <Box row key={index}>
            {group.map(setting => (
              <SettingItem {...setting} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SettingScreen;
