import {DrawerScreenProps} from '@react-navigation/drawer';

import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  RootDrawerParamList,
  SettingStackParamList,
} from '@movie_trailer/navigations/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';

export type PolicyScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SettingStackParamList, NavigatorMap.Policy>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.SettingNavigator>
>;

export type PolicyRouteProps = PolicyScreenProps['route'];
export type PolicyNavigationProps = PolicyScreenProps['navigation'];
