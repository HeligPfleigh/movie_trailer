import React, {useState} from 'react';
import {
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import {Box} from '@movie_trailer/components';
import {colors, responsiveSize} from '@movie_trailer/theme';
import Close from '@movie_trailer/assets/icons/Close';
import FlashIcon from '@movie_trailer/assets/icons/Flash';
import MoreRoundIcon from '@movie_trailer/assets/icons/MoreRound';
import SnapIcon from '@movie_trailer/assets/icons/Snap';
import CameraIcon from '@movie_trailer/assets/icons/Camera';
import {SelfieCameraScreenProps} from './types';
import SettingPopup from './components/SettingPopup';
import ChangeFramePopup from './components/ChangeFramePopup';
import {ISelfieFrameType} from '@movie_trailer/core/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    width: responsiveSize(34),
    height: responsiveSize(34),
  },
});

const SelfieCameraScreen: React.FC<SelfieCameraScreenProps> = ({
  navigation,
  route,
}: SelfieCameraScreenProps) => {
  const devices = useCameraDevices();
  const device = devices.back;

  /** for toggling flash mode */
  const [flash, setFlash] = useState<boolean>(false);
  const toggleFlash = () => setFlash(prev => !prev);

  /** menu and change frame */
  const [settingPosition, setSettingPosition] = useState<number>(0);
  const [openSetting, setOpenSetting] = useState<boolean>(false);
  const [openFrames, setOpenFrames] = useState<boolean>(false);

  const toggleSetting = () => setOpenSetting(prev => !prev);
  const toggleChangeFramePopup = () => setOpenFrames(prev => !prev);

  const handleLayout = (event: LayoutChangeEvent) => {
    setSettingPosition(event.nativeEvent.layout.y + 80);
  };

  const handleSelectMenuOption = (option: 'changeFrame') => {
    switch (option) {
      case 'changeFrame':
        toggleChangeFramePopup();
        break;
      default:
        break;
    }
  };

  const handleChangeFrameType = (type: ISelfieFrameType) => {
    toggleChangeFramePopup();
    setSelfieFrameType(type);
  };

  const handleClose = () => navigation.goBack();

  /** frame type */
  const {selfieMode, media} = route.params;
  const [selfieFrameType, setSelfieFrameType] =
    useState<ISelfieFrameType>(selfieMode);

  console.log({selfieFrameType, media});

  if (!device) {
    return <Box />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Box color={colors.codGray}>
        {/** header */}
        <Box
          flex={false}
          row
          space="between"
          mt={4}
          ml={2}
          mr={2}
          onLayout={handleLayout}>
          <TouchableOpacity onPress={handleClose}>
            <Close />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleFlash}>
            <FlashIcon color={flash ? colors.royalBlue : colors.white} />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleSetting}>
            <MoreRoundIcon />
          </TouchableOpacity>
        </Box>

        <Box>
          {/* <Camera
            style={{width: 300, height: 300}}
            device={device}
            isActive
            photo
          /> */}
        </Box>

        {/** footer */}
        <Box flex={false} row space="between" ml={2} mr={2} mb={4} center>
          <Box flex={false} style={styles.preview} />
          <TouchableOpacity>
            <SnapIcon />
          </TouchableOpacity>

          <TouchableOpacity>
            <CameraIcon />
          </TouchableOpacity>
        </Box>

        <SettingPopup
          open={openSetting}
          top={settingPosition}
          onClose={toggleSetting}
          onSelect={handleSelectMenuOption}
        />

        <ChangeFramePopup
          isVisible={openFrames}
          onClose={toggleChangeFramePopup}
          onChangeFrame={handleChangeFrameType}
        />
      </Box>
    </SafeAreaView>
  );
};

export default SelfieCameraScreen;
