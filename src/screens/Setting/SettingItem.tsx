import {Box, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  settingItem: {
    width: responsiveSize(64),
    height: responsiveSize(64),
    backgroundColor: 'red',
    borderRadius: responsiveSize(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing(1),
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ISettingItemProps {
  onPress: () => void;
  icon: React.ReactNode;
  title: string;
  color: string;
}

const SettingItem: React.FC<ISettingItemProps> = (
  setting: ISettingItemProps,
) => {
  return (
    <Box center middle>
      <TouchableOpacity style={styles.button} onPress={setting.onPress}>
        <Box
          flex={false}
          style={[styles.settingItem, {backgroundColor: setting.color}]}>
          {setting.icon}
        </Box>
        <Typography color={colors.white} variant="h7">
          {setting.title}
        </Typography>
      </TouchableOpacity>
    </Box>
  );
};

export default SettingItem;
