import React, {useMemo, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import FastImage from 'react-native-fast-image';

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
import JellyBean from './components/JellyBean';
import KitKat from './components/KitKat';
import ResultPopup from './components/ResultPopup';
import Lollipop from './components/Lollipop';
import Marshmallow from './components/Marshmallow';
import Nougat from './components/Nougat';
import {useDispatch} from 'react-redux';
import {addRecentSelfieType} from '@movie_trailer/store/slices/selfieSlice';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    width: responsiveSize(34),
    height: responsiveSize(34),
  },
  camera: {
    width: '100%',
    height: '100%',
  },
});

const SelfieCameraScreen: React.FC<SelfieCameraScreenProps> = ({
  navigation,
  route,
}: SelfieCameraScreenProps) => {
  const devices = useCameraDevices();

  const cameraRef = useRef<Camera>(null);

  const [tmpPhoto, setTmpPhoto] = useState<string>();
  const [devicePosition, setDevicePosition] = useState<'back' | 'front'>(
    'back',
  );
  const device = devices[devicePosition];

  const dispatch = useDispatch();

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
        // fix: cannot open and close modal simutanenous on ios
        setTimeout(() => toggleChangeFramePopup(), 500);
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

  /** result popup */
  const [openResult, setOpenResult] = useState<boolean>(false);
  const toggleResultPopup = () => setOpenResult(prev => !prev);

  /** frame type */
  const {selfieMode, media} = route.params;
  const [selfieFrameType, setSelfieFrameType] =
    useState<ISelfieFrameType>(selfieMode);

  const camera = useMemo(
    () =>
      device ? (
        <Camera
          style={styles.camera}
          device={device}
          isActive
          photo
          ref={cameraRef}
        />
      ) : null,
    [device],
  );

  const handleTakePhoto = async () => {
    try {
      const photo = await cameraRef.current?.takePhoto({
        flash: flash ? 'on' : 'off',
      });
      setTmpPhoto(photo?.path);
      dispatch(addRecentSelfieType(selfieFrameType));
      toggleResultPopup();
    } catch (error) {
      // TODO
    }
  };

  const handleSwitchCamera = () =>
    setDevicePosition(prev => {
      if (prev === 'back') {
        return 'front';
      }
      return 'back';
    });

  const content = useMemo(() => {
    switch (selfieFrameType) {
      case 'SelfieJellyBeanFrame':
        return <JellyBean media={media} camera={camera} />;
      case 'SelfieKitKatFrame':
        return <KitKat media={media} camera={camera} />;
      case 'SelfieLollipopFrame':
        return <Lollipop media={media} camera={camera} />;
      case 'SelfieMarshmallowFrame':
        return <Marshmallow media={media} camera={camera} />;
      case 'SelfieNougatFrame':
        return <Nougat media={media} camera={camera} />;
      default:
        return <Box color={colors.codGray} />;
    }
  }, [selfieFrameType, media, camera]);

  const resultContent = useMemo(() => {
    const image = (
      <FastImage
        source={{uri: `file://${tmpPhoto}`}}
        resizeMode={FastImage.resizeMode.cover}
        style={styles.camera}
      />
    );
    switch (selfieFrameType) {
      case 'SelfieJellyBeanFrame':
        return <JellyBean media={media} camera={image} />;
      case 'SelfieKitKatFrame':
        return <KitKat media={media} camera={image} />;
      case 'SelfieLollipopFrame':
        return <Lollipop media={media} camera={image} />;
      case 'SelfieMarshmallowFrame':
        return <Marshmallow media={media} camera={image} />;
      case 'SelfieNougatFrame':
        return <Nougat media={media} camera={image} />;
      default:
        return <Box color={colors.codGray} />;
    }
  }, [selfieFrameType, media, tmpPhoto]);

  if (!device) {
    return <Box color={colors.codGray} />;
  }

  return (
    <Box color={colors.codGray}>
      <SafeAreaView style={styles.container}>
        {/** header */}
        <Box
          flex={false}
          row
          space="between"
          mt={4}
          ml={2}
          mr={2}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{zIndex: 2}}
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

        <Box mt={2} mb={2}>
          {content}
        </Box>

        {/** footer */}
        <Box flex={false} row space="between" ml={2} mr={2} mb={4} center>
          {tmpPhoto ? (
            <FastImage
              source={{uri: `file://${tmpPhoto}`}}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.preview}
            />
          ) : (
            <Box flex={false} style={styles.preview} />
          )}

          <TouchableOpacity onPress={handleTakePhoto}>
            <SnapIcon />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSwitchCamera}>
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

        <ResultPopup
          isVisible={openResult}
          onClose={toggleResultPopup}
          content={resultContent}
        />
      </SafeAreaView>
    </Box>
  );
};

export default SelfieCameraScreen;
