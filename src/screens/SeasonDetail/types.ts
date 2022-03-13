import {DrawerScreenProps} from '@react-navigation/drawer';

import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';

export type SeasonDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.SeasonDetail>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

export type SeasonDetailRouteProps = SeasonDetailScreenProps['route'];
export type SeasonDetailNavigationProps = SeasonDetailScreenProps['navigation'];
