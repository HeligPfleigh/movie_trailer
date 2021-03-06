import React from 'react';
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
  selected?: 'rating.desc' | 'title.desc' | 'title.asc';
  onSelectFilter: (filter: 'rating.desc' | 'title.desc' | 'title.asc') => void;
  onClose: () => void;
};

const FilterPopup: React.FC<IFilterPopup> = ({
  open,
  onClose,
  top,
  selected,
  onSelectFilter,
}: IFilterPopup) => {
  const handleSelectItem =
    (item: 'rating.desc' | 'title.desc' | 'title.asc') => () => {
      onSelectFilter(item);
      onClose();
    };

  const menus = [
    {value: 'title.asc' as const, label: 'Name A-Z'},
    {value: 'title.desc' as const, label: 'Name Z-A'},
    {value: 'rating.desc' as const, label: 'Best rating'},
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
              color={selected === value ? colors.royalBlue : colors.mirage}
              fontFamily={selected === value ? 'Poppins-SemiBold' : 'Poppins'}>
              {label}
            </Typography>
            {selected === value && <Check />}
          </TouchableOpacity>
        ))}
      </Box>
    </Modal>
  );
};

export default FilterPopup;
