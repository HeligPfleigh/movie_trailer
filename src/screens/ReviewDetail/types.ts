import {DrawerScreenProps} from '@react-navigation/drawer';

import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';

export type ReviewDetailScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.ReviewDetail>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

export type ReviewDetailRouteProps = ReviewDetailScreenProps['route'];
export type ReviewDetailNavigationProps = ReviewDetailScreenProps['navigation'];
