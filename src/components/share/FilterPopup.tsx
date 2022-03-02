import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {Box, Typography} from '../common';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';
import Check from '@movie_trailer/assets/icons/Check';

const styles = StyleSheet.create({
  calendarContainer: {
    width: responsiveSize(176),
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

type IFilterPopup = {
  top: number;
  open: boolean;
  onClose: () => void;
};

const FilterPopup: React.FC<IFilterPopup> = ({
  open,
  onClose,
  top,
}: IFilterPopup) => {
  const [mode, setMode] = useState<'rating.desc' | 'title.desc' | 'title.asc'>(
    'title.asc',
  );

  const handleSelectItem =
    (item: 'rating.desc' | 'title.desc' | 'title.asc') => () => {
      setMode(item);
      onClose();
    };

  const menus = [
    {value: 'rating.desc' as const, label: 'Best rating'},
    {value: 'title.desc' as const, label: 'Name Z-A'},
    {value: 'title.asc' as const, label: 'Name A-Z'},
  ];

  return (
    <Modal
      isVisible={open}
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackdropPress={onClose}
      backdropColor="transparent"
      statusBarTranslucent>
      <Box center middle>
        <Box
          flex={false}
          style={[
            styles.calendarContainer,
            {
              top,
            },
          ]}>
          {menus.map(({value, label}) => (
            <TouchableOpacity
              style={styles.menuItem}
              key={value}
              onPress={handleSelectItem(value)}>
              <Typography
                variant="caps1"
                color={mode === value ? colors.royalBlue : colors.mirage}
                fontWeight={mode === value ? '600' : '400'}>
                {label}
              </Typography>
              {mode === value && <Check />}
            </TouchableOpacity>
          ))}
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterPopup;
