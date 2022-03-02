import {DrawerScreenProps} from '@react-navigation/drawer';

import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';

export type ActorDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.ActorDetail>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

export type ActorDetailRouteProps = ActorDetailScreenProps['route'];
