import {DrawerScreenProps} from '@react-navigation/drawer';

import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';

export type AddReviewScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.AddReview>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

export type AddReviewRouteProps = AddReviewScreenProps['route'];
export type AddReviewNavigationProps = AddReviewScreenProps['navigation'];
