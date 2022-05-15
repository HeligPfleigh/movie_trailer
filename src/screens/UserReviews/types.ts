import {DrawerScreenProps} from '@react-navigation/drawer';

import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {
  MainStackParamList,
  RootDrawerParamList,
} from '@movie_trailer/navigations/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CompositeScreenProps} from '@react-navigation/native';

export type UserReviewsScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, NavigatorMap.UserReviews>,
  DrawerScreenProps<RootDrawerParamList, NavigatorMap.Home>
>;

export type UserReviewsRouteProps = UserReviewsScreenProps['route'];
export type UserReviewsNavigationProps = UserReviewsScreenProps['navigation'];
