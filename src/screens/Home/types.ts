import NavigatorMap from '@movie_trailer/navigations/NavigatorMap';
import {RootDrawerParamList} from '@movie_trailer/navigations/types';
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from '@react-navigation/drawer';

export type HomeNavigationProps = DrawerNavigationProp<
  RootDrawerParamList,
  NavigatorMap.Home
>;

export type HomeScreenProps = DrawerScreenProps<
  RootDrawerParamList,
  NavigatorMap.Home
>;
