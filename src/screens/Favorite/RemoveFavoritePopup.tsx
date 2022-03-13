import {Box, Typography} from '@movie_trailer/components';
import {colors, spacing} from '@movie_trailer/theme';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

const styles = StyleSheet.create({
  container: {
    width: 264,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: spacing(2),
    paddingTop: spacing(3),
    alignItems: 'center',
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: colors.cadetBlue,
    marginHorizontal: spacing(2),
  },
});

interface IRemoveFavoritePopupProps {
  open: boolean;
  type: string;
  onClose: () => void;
  onConfirm: () => void;
}

const RemoveFavoritePopup: React.FC<IRemoveFavoritePopupProps> = ({
  open,
  type,
  onClose,
  onConfirm,
}: IRemoveFavoritePopupProps) => {
  return (
    <Modal
      isVisible={open}
      animationIn="fadeInDown"
      animationOut="fadeOutUp"
      onBackdropPress={onClose}>
      <Box center middle>
        <Box flex={false} style={styles.container}>
          <Typography
            color={colors.codGray}
            variant="h6"
            textAlign="center"
            fontFamily="Poppins-Bold">
            Remove favorite
          </Typography>

          <Box flex={false} mt={1} center>
            <Typography
              variant="caps2"
              color={colors.slateGray}
              textAlign="center">
              {`Are you sure you would like to remove this ${type} from the favorite?`}
            </Typography>
          </Box>

          <Box flex={false} mt={3} row>
            <TouchableOpacity onPress={onConfirm}>
              <Typography
                variant="caps1"
                color={colors.royalBlue}
                fontFamily="Poppins-Bold">
                Remove
              </Typography>
            </TouchableOpacity>

            <Box flex={false} style={styles.divider} />

            <TouchableOpacity onPress={onClose}>
              <Typography
                variant="caps1"
                color={colors.riverBed}
                fontFamily="Poppins-Bold">
                No, Thanks
              </Typography>
            </TouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default RemoveFavoritePopup;
