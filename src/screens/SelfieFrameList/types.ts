import {DrawerScreenProps} from '@react-navigation/drawer';

import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';

export type SelfieFrameListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.SelfieFrameList>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

export type SelfieFrameListRouteProps = SelfieFrameListScreenProps['route'];
export type SelfieFrameListNavigationProps =
  SelfieFrameListScreenProps['navigation'];
