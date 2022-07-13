import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import {Box, Typography} from '@movie_trailer/components';
import FrameIcon from '@movie_trailer/assets/icons/Frame';

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: colors.white,
    position: 'absolute',
    right: -4,
    borderRadius: responsiveSize(8),
    paddingHorizontal: spacing(2),
    paddingTop: spacing(1.5),
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing(1.5),
  },
});

type ISettingPopupProps = {
  top: number;
  open: boolean;
  onSelect: (option: 'changeFrame') => void;
  onClose: () => void;
};

const SettingPopup: React.FC<ISettingPopupProps> = ({
  open,
  onClose,
  top,
  onSelect,
}: ISettingPopupProps) => {
  const handleSelectItem = (item: 'changeFrame') => () => {
    onSelect(item);
    onClose();
  };

  const menus = [
    {value: 'changeFrame' as const, label: 'Change Frame', icon: <FrameIcon />},
  ];

  return (
    <Modal
      isVisible={open}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onClose}
      backdropColor="transparent"
      statusBarTranslucent>
      <Box
        flex={false}
        style={[
          styles.menuContainer,
          {
            top,
          },
        ]}>
        {menus.map(({value, label, icon}) => (
          <TouchableOpacity
            style={styles.menuItem}
            key={value}
            onPress={handleSelectItem(value)}>
            {icon}
            <Box flex={false} ml={1}>
              <Typography
                variant="caps1"
                color={colors.royalBlue}
                fontFamily="Poppins">
                {label}
              </Typography>
            </Box>
          </TouchableOpacity>
        ))}
      </Box>
    </Modal>
  );
};

export default SettingPopup;
