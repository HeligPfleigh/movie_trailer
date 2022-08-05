import {DrawerScreenProps} from '@react-navigation/drawer';

import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  RootDrawerParamList,
  SettingStackParamList,
} from '@movie_trailer/navigations/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';

export type SettingScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SettingStackParamList, NavigatorMap.Setting>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.SettingNavigator>
>;

export type SettingRouteProps = SettingScreenProps['route'];
export type SettingNavigationProps = SettingScreenProps['navigation'];
