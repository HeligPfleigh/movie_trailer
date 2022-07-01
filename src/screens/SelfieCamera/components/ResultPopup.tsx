import React, {useRef, useState} from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import Toast, {useToast} from 'react-native-toast-notifications';

import Close from '@movie_trailer/assets/icons/Close';
import {Box, Typography} from '@movie_trailer/components';
import {colors, responsiveSize, spacing} from '@movie_trailer/theme';

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  viewShot: {
    flex: 1,
  },
  actionBtn: {
    paddingHorizontal: spacing(2.5),
    paddingVertical: spacing(1.5),
    margin: spacing(2),
    borderRadius: responsiveSize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ResultPopupProps {
  isVisible: boolean;
  onClose: () => void;
  content: JSX.Element;
}

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

const ResultPopup: React.FC<ResultPopupProps> = ({
  isVisible,
  onClose,
  content,
}: ResultPopupProps) => {
  const ref = useRef<any>(null);
  const toastRef = useRef<any>(null);
  const toast = useToast();

  const [disableAction, setDisableAction] = useState<boolean>(false);

  const handleSavePhoto = async () => {
    try {
      setDisableAction(true);
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        toast.show(
          'Please manually grant us permission to store this image on your phone!',
          {type: 'normal'},
        );
        return;
      }
      const uri = await ref.current.capture();
      await CameraRoll.save(uri);
      toastRef.current?.show(
        'Picture is saved! You now can view it on your gallery.',
        {type: 'success'},
      );
    } catch (error) {
      if (error instanceof Error) {
        toastRef.current?.show(error.message, {type: 'error'});
      }
    } finally {
      setDisableAction(false);
    }
  };

  const handleSharePhoto = async () => {
    try {
      setDisableAction(true);
      const uri = await ref.current.capture();
      await Share.open({
        url: uri,
      });
    } catch (error) {
      if (error instanceof Error) {
        toastRef.current?.show(error.message, {type: 'error'});
      }
    } finally {
      setDisableAction(false);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      style={styles.modal}>
      <SafeAreaView style={styles.container}>
        <Box color={colors.codGray}>
          <Box flex={false} mt={4} mr={2} ml={2} style={{zIndex: 2}}>
            <TouchableOpacity onPress={onClose}>
              <Close />
            </TouchableOpacity>
          </Box>

          <Box mt={2} mb={1}>
            <ViewShot ref={ref} style={styles.viewShot}>
              {content}
            </ViewShot>
          </Box>

          <Box
            flex={false}
            row
            center
            middle
            style={{minHeight: responsiveSize(112)}}>
            <TouchableOpacity
              onPress={handleSavePhoto}
              disabled={disableAction}>
              <LinearGradient
                colors={[colors.fuchsiaPink, colors.irisBlue]}
                useAngle={true}
                angle={135}
                angleCenter={{x: 0.5, y: 0.5}}
                style={styles.actionBtn}>
                <Typography variant="h7" color={colors.white}>
                  Save Photo
                </Typography>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSharePhoto}
              disabled={disableAction}>
              <LinearGradient
                colors={[colors.fuchsiaPink, colors.irisBlue]}
                useAngle={true}
                angle={135}
                angleCenter={{x: 0.5, y: 0.5}}
                style={styles.actionBtn}>
                <Typography variant="h7" color={colors.white}>
                  Share Photo
                </Typography>
              </LinearGradient>
            </TouchableOpacity>
          </Box>
        </Box>
        <Toast ref={toastRef} />
      </SafeAreaView>
    </Modal>
  );
};

export default ResultPopup;
