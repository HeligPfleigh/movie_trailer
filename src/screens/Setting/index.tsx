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
import {Linking, Platform, Share, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import SettingItem from './SettingItem';

const styles = StyleSheet.create({
  settings: {
    height: responsiveSize(300),
    backgroundColor: colors.oxfordBlue,
    margin: spacing(2),
    borderRadius: responsiveSize(16),
  },
});

const googlePlayLink = `https://play.google.com/store/apps/details?id=${Config.GOOGLEPLAY_ID}`;
const appleStoreLink = `https://itunes.apple.com/us/app/id/${Config.APPSTORE_ID}`;

const sharelink = Platform.OS === 'ios' ? appleStoreLink : googlePlayLink;
const rateLink =
  Platform.OS === 'ios'
    ? `${appleStoreLink}&action=write-review`
    : googlePlayLink;

const SettingScreen: React.FC = () => {
  const handlePressShare = () => {
    Share.share({
      message: `Check out this app! ${sharelink}`,
    });
  };

  const handlePressRateAndReview = () => Linking.openURL(rateLink);

  const handlePressPrivacyPolicy = () =>
    Linking.openURL(Config.PRIVACY_POLICY_URL);

  const handlePressFeedback = () =>
    Linking.openURL(`mailto:${Config.FEEDBACK_EMAIL}`);

  const settings = [
    [
      {
        onPress: handlePressPrivacyPolicy,
        icon: <PrivacyIcon />,
        title: 'Privacy Policy',
        color: colors.selago,
      },
      {
        onPress: handlePressRateAndReview,
        icon: (
          <StarIcon width={responsiveSize(32)} height={responsiveSize(32)} />
        ),
        title: 'Rating App',
        color: colors.halfDutchWhite,
      },
    ],
    [
      {
        onPress: handlePressShare,
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
        onPress: handlePressFeedback,
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
        <Typography
          variant="h4"
          color={colors.white}
          fontFamily="Poppins-SemiBold">
          Setting
        </Typography>
      </Box>

      <Box flex={false} style={styles.settings}>
        {settings.map((group, index) => (
          <Box row key={index}>
            {group.map(setting => (
              <SettingItem {...setting} key={setting.title} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SettingScreen;
