import {DrawerScreenProps} from '@react-navigation/drawer';

import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';
import {IMediaOverview} from '@movie_trailer/core/types';
import React from 'react';

export type SelfieCameraScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.SelfieCamera>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

export type SelfieCameraRouteProps = SelfieCameraScreenProps['route'];

export interface IFrameComponentProps {
  media: IMediaOverview;
  camera: React.ReactNode;
}
